<?php

namespace App\Http\Controllers\Api;

use App\Calendar;
use App\CalendarCategory;
use App\Company;
use App\Event;
use App\EventReminder;
use App\HtmlGenerate;
use App\Http\Requests\StoreCalendar;
use App\LicenseModel;
use App\MapAnalyse;
use App\Subscriber;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
Use Illuminate\Support\Str;
//use Spatie\CalendarLinks\Link;
//use Ical\Ical;
//use Symfony\Component\HttpFoundation\Response;

use App\Http\Controllers\IcsClass;

class CalendarController extends Controller
{
    public function listView(Request $request) {
        $user = $request->user();
        $calendars = Calendar::where('company_id', $user->company_id)->get();

        return response()->json(['status' =>'success', 'calendars' => $calendars], 200);
    }

    public function storeCalendar(StoreCalendar $request){
        $calendarInfo = $request->all();
        $calendar_create = 0;
        $company = Company::where('id', $calendarInfo['company_id'])->first();
        $calendar = [];

        if($request->hasFile('image')){
            $image = $request->file('image');
            $picture = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads');
            $image->move($destinationPath, $picture);
            $calendarInfo['picture'] = $picture;
            unset($calendarInfo['image']);
        }

        if($request->calendar_id) {
            unset($calendarInfo['calendar_id']);
            unset($calendarInfo['image']);
            unset($calendarInfo['categories']);
            Calendar::where('id', $request->calendar_id)->update($calendarInfo);
            $calendar = Calendar::find($request->calendar_id);
            if($calendar->hash_code == "") {
                Calendar::where('id', $request->calendar_id)->update(['hash_code' => $this->getToken()]);
            }
        }else {
            $calendarInfo['hash_code'] = $this->getToken();
            if($company->license_model != ''){
                $licenseModel = LicenseModel::where('id', $company->license_model)->first();
                $numberOfCalendars = Calendar::where('company_id', $calendarInfo['company_id'])->count();
                $currentDate = Carbon::now();
                if(($licenseModel->number_of_calendars > $numberOfCalendars)){
                    if(isset($company->license_expire_date)){
                        if(($company->license_expire_date > $currentDate->toDateString())){
                            $calendar = Calendar::create($calendarInfo);
                        } else {
                            $calendar_create  = 1;
                        }

                    } else {
                        $calendar = Calendar::create($calendarInfo);
                    }
                } else {
                    $calendar_create = 1;
                }
            } else {
                $calendar = Calendar::create($calendarInfo);
            }
        }


        if($calendar_create == 0){

            /*** create calendar category ****/
            if($request->categories != "" && $request->categories != 'undefined'){
                $calendarCategories = explode(",", $request->categories);
                if(count($calendarCategories) >0){
                    CalendarCategory::where('calendar_id', $calendar->id)->delete();
                    for($i=0; $i<count($calendarCategories); $i++){
                        CalendarCategory::create([
                            'company_id' => $calendar->company_id,
                            'calendar_id' => $calendar->id,
                            'category_id' => $calendarCategories[$i]
                        ]);
                    }
                }

            }

            /*** Create ICS file Start*****/
//            $ical = new IcsClass();
//            $calendarICSFile = public_path('ics')."/".$calendar->hash_code.".ics";
//            if(file_exists($calendarICSFile)) {
//                unlink($calendarICSFile);
//            }
//            fopen($calendarICSFile, 'w');
//            file_put_contents($calendarICSFile, $ical->getICAL($calendar->id));

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

            return response()->json(['status' =>'success', 'data' => $calendar], 200);
        } else {

            return response()->json(['status' =>'failed', 'message' => 'Can not create calendar'], 200);

        }

    }

    public function getCalendar(Request $request){
        $calendar_id = 0;
        $calendar_id = $request->calendar_id;
        if($calendar_id != '' && $calendar_id !=0 ){
            $calendar = Calendar::where('id', $calendar_id)->first();
            $calendarCategories = CalendarCategory::where('calendar_id', $calendar_id)->get();
            return response()->json(['status' => 'success', 'calendar' => $calendar, 'calendarCategories' => $calendarCategories], 200);
        } else {
            return response()->json(['status' =>'failed', 'message' =>'Can not find calender'], 401);
        }
    }

    public function deleteCalendar(Request $request){
        $calendar_id = $request->calendar_id;
        $user = $request->user();
        if($calendar_id !='') {
            $calendar = Calendar::where('id', $calendar_id)->first();
            if( ($calendar->company_id == $user->company_id) || $user->role == 'admin'){
                Event::where('calendar_id', $calendar_id)->delete();
                HtmlGenerate::where('calendar_id', $calendar_id)->delete();
                EventReminder::where('calendar_id', $calendar_id)->delete();
                Subscriber::where('calendar_id', $calendar_id)->delete();
                MapAnalyse::where('calendar_id', $calendar_id)->delete();
                CalendarCategory::where('calendar_id', $calendar_id)->delete();
                Calendar::where('id', $calendar_id)->delete();
                return response()->json(['status' =>'success'], 200);
            } else {
                return response()->json(['status' =>'failed', 'message' =>'Can not delete calender'], 401);
            }
        } else {
            return response()->json(['status' =>'failed', 'message' =>'Can not find calender'], 401);
        }
    }

    public function ViewCalendar(Request $request){
        $calendar_id = $request->calendar_id;
        if($calendar_id !=''){
            $events = Event::where('calendar_id', $calendar_id)->get();
            if(count($events)>0){
                foreach($events as $key => $event){
                    $event->reminders = $event->reminders;
                }
            }
            $calendar = Calendar::where('id', $calendar_id)->first();
            $htmlCode = HtmlGenerate::where('company_id', $calendar->company_id)->where('type', 'website')->first();
            if($calendar->hash_code == "") {
                Calendar::where('id', $request->calendar_id)->update(['hash_code' => $this->getToken()]);
            }
            if($htmlCode){
                $data= [
                    'status'=>'success', 'events' => $events, 'calendar' => $calendar, 'html_json' => json_decode($htmlCode->html_json)
                ];
            } else{
                $data= [
                    'status'=>'success', 'events' => $events, 'calendar' => $calendar, 'html_json' =>''
                ];
            }
            return response()->json($data, 200);
        }else{
            return response()->json(['status' =>'failed', 'message' =>'Can not find calender'], 401);
        }
    }

    public function getToken() {
        do {
            $token = Str::random(64);
            $event = Calendar::where('hash_code', $token)->get();
        }
        while(count($event) > 0);
        return $token;
    }
}
