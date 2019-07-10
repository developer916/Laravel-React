<?php

namespace App\Http\Controllers\Api;

use App\Calendar;
use App\Event;
use App\Http\Requests\StoreEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
Use Illuminate\Support\Str;
use App\Http\Controllers\IcsClass;
use App\EventReminder;

Use App\Company;
Use App\LicenseModel;

class EventController extends Controller
{
    public function getEvent(Request $request) {
        $event = Event::where('id', $request->id)->first();
        $event_reminders = EventReminder::where('event_id', $request->id)->get();
        return response()->json(['status' => 'success', 'data' => $event, 'event_reminders' => $event_reminders], 200);
    }

    public function getEventShortLink(Request $request){
        $token = $this->getToken();
        $domain_data["fullName"] = "posbill.io";
        $post_data["destination"] = URL::to('/').'/events/link/'.$token;
        $post_data["domain"] = $domain_data;
        //$post_data["slashtag"] = "A_NEW_SLASHTAG";
        //$post_data["title"] = "Rebrandly YouTube channel";
        $ch = curl_init("https://api.rebrandly.com/v1/links");

        $apiKey = env('REBRANDLY_API_KEY');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "apikey: $apiKey",
            "Content-Type: application/json"
        ));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post_data));
        $result = curl_exec($ch);
        curl_close($ch);
        $response = json_decode($result, true);
        if($response['status'] == "active"){
            $url =  $response["shortUrl"];
        } else {
            $url = "";
        }

        return response()->json(['hash_code' => $token, 'short_link' => "https://$url"]);

    }

   public function storeEvent(StoreEvent $request){
        $eventInfo = $request->all();
        $times = [];
        $units = [];

        if($request->has('times')){
            $times = $request->get('times');
        }
       if($request->has('units')){
           $units = $request->get('units');
       }
        $event_create = 0;
        $company = Company::where('id', $eventInfo['company_id'])->first();
        if($request->date_from != "" ){
            $dateFromCarbon = new Carbon($request->date_from);
            $eventInfo['date_from'] = $dateFromCarbon->toDateTimeString();
        }
        if($request->date_to != "" ){
            $dateToCarbon = new Carbon($request->date_to);
            $eventInfo['date_to'] = $dateToCarbon->toDateTimeString();
        }

        if($request->event_id != '') {
            unset($eventInfo['event_id']);
            unset($eventInfo['times']);
            unset($eventInfo['units']);
            Event::where('id', $request->event_id)->update($eventInfo);
            $event = Event::find($request->event_id);

            if( (count($times) >0) && (count($units) >0)) {
                $this->storeEventReminders($times, $units, $event, 1);
            }

        }else{
            unset($eventInfo['times']);
            unset($eventInfo['units']);
            if($company->license_model != ''){
                $licenseModel = LicenseModel::where('id', $company->license_model)->first();
                $numberOfEvents = Event::where('company_id', $eventInfo['company_id'])->count();
                $currentDate = Carbon::now();
                if(($licenseModel->number_of_events > $numberOfEvents)){
                    if(isset($company->license_expire_date)) {
                        if(($company->license_expire_date > $currentDate->toDateString())){
                            $event = Event::create($eventInfo);
                            if( (count($times) >0) && (count($units) >0)) {
                                $this->storeEventReminders($times, $units, $event, 0);
                            }
                        } else {
                            $event_create = 1;
                        }
                    } else {
                        $event = Event::create($eventInfo);
                        if( (count($times) >0) && (count($units) >0)) {
                            $this->storeEventReminders($times, $units, $event, 0);
                        }
                    }

                } else {
                    $event_create = 1;
                }
            } else {
                $event = Event::create($eventInfo);
                if( (count($times) >0) && (count($units) >0)) {
                    $this->storeEventReminders($times, $units, $event, 0);
                }
            }
        }

        if($event_create == 0) {
            $event->reminders = $event->reminders;
            /** create ics files */
            $this->createICSFiles($event);

            return response()->json(['status' =>'success', 'data' => $event], 200);

        } else {
            return response()->json(['status'=>'failed', 'message' =>'Can not create event'], 200);
        }

   }

   public function storeEventReminders($times, $units, $event, $update){
       if($update == 1){
           EventReminder::where('event_id', $event->id)->delete();
       }

       for($i =0; $i< count($times); $i++){
            $insert_reminder = [];
            $insert_reminder['company_id'] = $event->company_id;
            $insert_reminder['calendar_id'] = $event->calendar_id;
            $insert_reminder['event_id'] = $event->id;
           $insert_reminder['unit'] = $units[$i];
           $insert_reminder['time'] = $times[$i];
            EventReminder::create($insert_reminder);
       }
       return true;
   }

   public function deleteEvent(Request $request){
       $event_id = $request->event_id;
       if($event_id !='') {
           $event = Event::where('id', $event_id)->first();
           $user = $request->user();
           if($user->company_id == $event->company_id){
               $event->delete();
               EventReminder::where('event_id', $event_id)->delete();
               $this->createICSFiles($event);
               return response()->json(['status' =>'success'], 200);
           } else {
               return response()->json(['status' =>'failed', 'message' =>'Can not delete event'], 401);
           }

       }else{
           return response()->json(['status' =>'failed', 'message' =>'Can not find event'], 401);
       }
   }

   public function updateEvent(Request $request){
        $event = $request->all();
        $event = Event::where('id', $event['id'])->first();
        if (empty($event)) {
            return response()->json(['status' =>'failed', 'message' =>'Can not find event'], 401);
        } else {
            $dateFromCarbon = new Carbon($request->start);
            $event->date_from = $dateFromCarbon->toDateTimeString();
            $dateToCarbon = new Carbon($request->end);
            $event->date_to = $dateToCarbon->toDateTimeString();
            $event->save();
            $event->reminders = $event->reminders;
            /** create ics files */
            $this->createICSFiles($event);
            return response()->json(['status' => 'success', 'data' => $event], 200);
        }
   }

   public function createICSFiles($event){
       /*** Create ICS file Start*****/
       $calendar = Calendar::where('id', $event->calendar_id)->first();
//           $ical = new IcsClass();
//           $calendarICSFile = public_path('ics')."/".$calendar->hash_code.".ics";
//           if(file_exists($calendarICSFile)) {
//               unlink($calendarICSFile);
//           }
//           fopen($calendarICSFile, 'w');
//           file_put_contents($calendarICSFile, $ical->getICAL($calendar->id));

       $ical = new IcsClass();
       $calendarICSFile = public_path('ics')."/".$calendar->hash_code.".ics";
       $calendarIcsFileName = $calendar->hash_code;

       if(file_exists($calendarICSFile)) {
           unlink($calendarICSFile);
       }
       fopen($calendarICSFile, 'w');
       $ical->setFilename($calendarIcsFileName);
       $ical->getICAL($calendar->id);
       file_put_contents($calendarICSFile, $ical->getICAL($calendar->id));
       $ical->addHeader();

           /*** Create ICS file End*****/
   }
    /*** get token ***/
    public function getToken() {
        do {
            $token = Str::random(64);
            $event = Event::where('hash_code', $token)->get();
        }
        while(count($event) > 0);
        return $token;
    }

}
