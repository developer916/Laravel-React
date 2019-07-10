<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Company;
use App\Event;
use App\Maintenance;
use App\MapAnalyse;
use App\MapCountry;
use App\MapData;
use App\SubscriberLog;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Calendar;
use App\Subscriber;
use App\HtmlGenerate;
use App\LicenseModel;
use DB;
use App\Http\Controllers\IcsClass;

class DashboardController extends Controller
{

    public function getPublicCalendar(Request $request){
        $search = $request->get('search');
        $categories = $request->get('categories');
        $company = str_replace("_", " ", $request->get('company'));
        if(!empty($company)){
            if(!empty($categories)){
                if(!empty($search)) {
                    if(count($categories) >0){
                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->leftJoin('calendar_categories', 'calendars.id' , '=' , 'calendar_categories.calendar_id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->where('company.search_name', '=', $company)
                            ->whereIn('calendar_categories.category_id', $categories)
                            ->where('calendars.name', 'like', '%'.$search.'%')
                            ->groupBy('calendars.id')
                            ->get();
                    } else {

                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->where('company.search_name', '=', $company)
                            ->where('calendars.name', 'like', '%'.$search.'%')
                            ->get();
                    }
                }else {
                    if(count($categories) >0){
                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->leftJoin('calendar_categories', 'calendars.id' , '=' , 'calendar_categories.calendar_id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->whereIn('calendar_categories.category_id', $categories)
                            ->where('company.search_name', '=', $company)
                            ->groupBy('calendars.id')
                            ->get();
                    } else {
                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->where('company.search_name', '=', $company)
                            ->get();
                    }
                }
            } else {
                if(!empty($search)) {
                    $calendars = Calendar::select('calendars.*')
                        ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                        ->where('calendars.public', '=' , 'false')
                        ->where('calendars.company_id', '!=' , 0)
                        ->where('company.status', '=', 'active')
                        ->where('company.search_name', '=', $company)
                        ->where('calendars.name', 'like', '%'.$search.'%')->get();
                } else {
                    $calendars = Calendar::select('calendars.*')
                        ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                        ->where('calendars.public', '=' , 'false')
                        ->where('calendars.company_id', '!=' , 0)
                        ->where('company.status', '=', 'active')
                        ->where('company.search_name', '=', $company)
                        ->get();
                }

            }
        } else {
            if(!empty($categories)){
                if(!empty($search)) {
                    if(count($categories) >0){
                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->leftJoin('calendar_categories', 'calendars.id' , '=' , 'calendar_categories.calendar_id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->whereIn('calendar_categories.category_id', $categories)
                            ->where(function($q) use ($search){
                                $q->where('calendars.name', 'like', '%'.$search.'%')
                                    ->orWhere('company.search_name', 'like', '%'.$search.'%');
                            })->groupBy('calendars.id')->get();
                    } else {

                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->where(function($q) use ($search){
                                $q->where('calendars.name', 'like', '%'.$search.'%')
                                    ->orWhere('company.search_name', 'like', '%'.$search.'%');
                            })->get();
                    }


                }else {
                    if(count($categories) >0){
                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->leftJoin('calendar_categories', 'calendars.id' , '=' , 'calendar_categories.calendar_id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->whereIn('calendar_categories.category_id', $categories)
                            ->groupBy('calendars.id')
                            ->get();
                    } else {
                        $calendars = Calendar::select('calendars.*')
                            ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                            ->where('calendars.public', '=' , 'false')
                            ->where('calendars.company_id', '!=' , 0)
                            ->where('company.status', '=', 'active')
                            ->get();
                    }
                }
            } else {
                if(!empty($search)) {
                    $calendars = Calendar::select('calendars.*')
                        ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                        ->where('calendars.public', '=' , 'false')
                        ->where('calendars.company_id', '!=' , 0)
                        ->where('company.status', '=', 'active')
                        ->where(function($q) use ($search){
                            $q->where('calendars.name', 'like', '%'.$search.'%')
                                ->orWhere('company.search_name', 'like', '%'.$search.'%');
                        })->get();
                } else {
                    $calendars = Calendar::select('calendars.*')
                        ->leftJoin('company', 'calendars.company_id', '=', 'company.id')
                        ->where('calendars.public', '=' , 'false')
                        ->where('calendars.company_id', '!=' , 0)
                        ->where('company.status', '=', 'active')
                        ->get();
                }

            }
        }



        $data = [];
        if(count($calendars) >0){
            foreach($calendars as $key => $calendar){
                $data[$key]['calendar'] = $calendar;
                $data[$key]['company'] = $this->decryptCompany($calendar->company);
            }
        }

        $maintenances = Maintenance::all();
        if(count($maintenances) >0){
            $maintenance = $maintenances[0]->confirm;
        } else {
            $maintenance = 'false';
        }

        return response()->json(['status' =>'success', 'data' => $data, 'maintenance' => $maintenance], 200);
    }

    public function getEventByHashCode(Request $request) {
        $event = Event::where('hash_code', $request->hash_code)->with('calendar')->first();
        return response()->json(['status' => 'success', 'data' => $event], 200);
    }

    public function getCompanies() {
        $companies = Company::all();
        $decryptCompanies = array();
        if(count($companies) >0){
            foreach ($companies as $key => $company){
                $decryptCompanies[$key] = $this->decryptCompany($company);
            }
        }
        return response()->json(['status' => 'success', 'companies' => $decryptCompanies], 200);
    }

    public function ViewCalendar(Request $request){
        $hashCode = $request->get('hash_code');
        $calendar = Calendar::where('hash_code', $hashCode)->where('public', 'false')->first();
        if($calendar) {
            $company = $this->decryptCompany($calendar->company);
            $events = Event::where('calendar_id', $calendar->id)->get();
        } else {
            $company = '';
            $events ='';
        }

        return response()->json(['status' =>'success', 'company' => $company, 'calendar' => $calendar,  'events' => $events]);
    }

    public function subscribeCalendar(Request $request) {
        $status ="failed";
        $add_subscriber = 0;
        $calendar = Calendar::where('id' , $request->get('calendar_id'))->first();
        $company = $calendar->company;
        $subscribers = Subscriber::where('uuid', $request->get('uuid'))->where('calendar_id', $request->get('calendar_id'))->first();
        if($subscribers){
            $subscribers->email = decrypt($subscribers->email);
            if($subscribers->name != ""){
                $subscribers->name = decrypt($subscribers->name);
            }

        }
 // set license model
/*        if($company->license_model != ''){
            $licenseModel = LicenseModel::where('id', $company->license_model)->first();
            $numberOfSubscribers = MapAnalyse::where('company_id', $company->id)->count();
            $currentDate = Carbon::now();
            if(($licenseModel->number_of_subscribers > $numberOfSubscribers)){
                if(isset($company->license_expire_date)) {
                    if(($company->license_expire_date > $currentDate->toDateString())) {
                        $add_subscriber = 0;
                    } else {
                        $add_subscriber = 1;
                    }
                } else {
                    $add_subscriber = 0;
                }

            } else {
                $add_subscriber = 1;
            }
        }
*/
        if($add_subscriber == 0) {

            $ip = file_get_contents('https://api.ipify.org');

            $result = $this->getInformationFromIp($ip);

            if($result != null) {

                if($result->status =="success"){
                    $country = $result->country;
                    $mapCountry = MapCountry::where('name', $country)->first();
                    if($mapCountry) {
                        $mapAnalyse = MapAnalyse::where('ip', $ip)->where('calendar_id', $request->get('calendar_id'))->where('uuid', $request->get('uuid'))->get();
                        if (count($mapAnalyse) == 0) {
                            MapAnalyse::create([
                                'calendar_id' => $request->get('calendar_id'),
                                'company_id' => $calendar->company_id,
                                'uuid' => $request->get('uuid'),
                                'code' => $mapCountry->code,
                                'name' => $mapCountry->name,
                                'ip' => $ip
                            ]);
                            $status ="success";
                        } else {
                            MapAnalyse::where('id', $mapAnalyse[0]->id)->update([]);
                        }
                    }
                }
            }

        }
        return response()->json(['status' => $status, 'subscribers' => $subscribers]);
    }

    public function getInformationFromIp($ip){
        $url = "http://ip-api.com/json/".$ip;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.A.B.C Safari/525.13");
        $result = json_decode(curl_exec($ch));
        curl_close($ch);
        return $result;
    }

    public function getMapData(Request $request){

        $sql = "select count(id) as value , mat.code, mat.name  from map_analyse as mat  where mat.company_id =  ". $request->get('company_id');

        if($request->get('calendar_id')){
            $sql .= " and mat.calendar_id = " . $request->get('calendar_id');
        }

        if($request->get('type') =="week"){
            $startWeek = Carbon::now()->subWeek();
            $endWeek = Carbon::now();
            $sql.= " and mat.updated_at > '$startWeek' and mat.updated_at < '$endWeek'";
        } else if($request->get('type') == "month"){
            $startMonth = Carbon::now()->subMonth();
            $endMonth = Carbon::now();
            $sql.= " and mat.updated_at > '$startMonth' and mat.updated_at < '$endMonth'";
        } else if($request->get('type') =="year"){
            $startYear = Carbon::now()->subYear();
            $endYear = Carbon::now();
            $sql.= " and mat.updated_at > '$startYear' and mat.updated_at < '$endYear'";
        }
        $sql .=" group by mat.name";

        $data = DB::select($sql);

        $max = DB::select("SELECT MAX(counted) as max_value FROM
                            (
                                SELECT COUNT(id) AS counted
                                FROM map_analyse
                                GROUP BY name
                            ) AS count_table");
        return response()->json(['status' => 'success', 'data' => $data, 'max' => $max]);

    }

    public function storeSubscriber(Request $request) {
        $storeSubscriber = 0;
        $calendar = Calendar::where('id', $request->calendar_id)->first();
        $subscriber = Subscriber::where('uuid', $request->uuid)
            ->where('calendar_id', $request->calendar_id)
            ->first();

        //for check license subscribers
/*        if(!$subscriber){
            if($calendar){
                $company = $calendar->company;
                if($company){
                    if($company->license_model != '') {
                        $licenseModel = LicenseModel::where('id', $company->license_model)->first();
                        $currentDate = Carbon::now();
                        $numberOfSubscribers = Subscriber::where('company_id', $company->id)->where('deleted', '!=', 1)->count();
                        if(($licenseModel->number_of_subscribers > $numberOfSubscribers)) {
                            if (isset($company->license_expire_date)) {
                                if (($company->license_expire_date > $currentDate->toDateString())) {
                                    $storeSubscriber = 0;
                                } else {
                                    $storeSubscriber = 1;
                                }
                            }else {
                                $storeSubscriber =0;
                            }
                        } else {
                            $storeSubscriber = 1;
                        }
                    } else {
                        $storeSubscriber = 0;
                    }
                }
            }
        }
*/

        if($storeSubscriber == 0){

            if (empty($subscriber)) {
                $subscriber = new Subscriber();
                $subscriber->calendar_id = $request->calendar_id;
                $subscriber->company_id = $calendar->company_id;
            }
            $subscriber->name = encrypt($request->name);
            $subscriber->email = encrypt($request->email);
            $subscriber->uuid = $request->uuid;
            if(!empty($subscriber)){
                if($subscriber->deleted == 0 ){
                    $subscriber->save();
                }
            } else {
                $subscriber->save();
            }

            $subscriber->name = decrypt($subscriber->name);
            $subscriber->email = decrypt($subscriber->email);

            return response()->json([
                'status' => 'success',
                'subscriber' => $subscriber
            ], 200);
        } else {
            return response()->json([
                'status' =>'failed'
            ]);
        }


    }


    public function updateSubscriberLogs(Request $request){
        $uuid = $request->uuid;
        $type = $request->type;
        $calendar_id = $request->calendar_id;
        $calendar = Calendar::where('id', $calendar_id)->first();
        $lat = "";
        $long = "";
        $subscriber = Subscriber::where('uuid', $uuid)->where('calendar_id', $calendar_id)->first();
        if(!empty($subscriber)){
            $subscriber_log = SubscriberLog::where('subscriber_id', $subscriber->id)->where('link_hash', $type)->first();
            if(empty($subscriber_log)){
                if($request->ip() == "127.0.0.1") {
                    $ip = "194.28.172.81" ;
                } else {
                    $ip = $request->ip();
                }
                $result = $this->getInformationFromIp($ip);
                if($result != null) {
                    if($result->status =="success"){
                        $lat = $result->lat;
                        $long = $result->lon;
                    }
                }
                 SubscriberLog::create([
                    'company_id' => $calendar->company->id,
                    'subscriber_id' => $subscriber->id,
                    'user_agent'  => $request->user_agent,
                    'location_la' => $lat,
                    'location_lo' => $long,
                    'ip' => $ip,
                    'link_hash' => $type
                ]);
            }
        }

        return response()->json(['status' => 'success'], 200);
    }

    public function getHtmlGenerate(Request $request) {
        $calendar = Calendar::where('hash_code', $request->hash_code)->first();
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

        $html_code = HtmlGenerate::where('company_id', $calendar->company_id)
            ->where('calendar_id', $calendar->id)
            ->where('type', $request->template_type)
            ->first();
        $code = empty($html_code) ? null : [
            'html_code'     => html_entity_decode($html_code->html_code),
            'html_json'     => json_decode($html_code->html_json)
        ];
        return response()->json(['result' => 'success', 'code' => $code], 200);
    }

    public function getMaintenance(Request $request){
        $maintenances = Maintenance::all();
        if(count($maintenances) >0){
            $maintenance = $maintenances[0]->confirm;
        } else {
            $maintenance = 'false';
        }
        return response()->json(['result' => 'success', 'maintenance' => $maintenance], 200);
    }


    //get categories
    public function getCategories(Request $request){
        $categories = Category::all();
        return response()->json(['status' => 'success', 'categories' => $categories], 200);
    }



    public function decryptCompany($company){
        if($company){
            $company->name = decrypt($company->name);
            $company->street = decrypt($company->street);
            $company->postal_code = decrypt($company->postal_code);
            $company->city = decrypt($company->city);
            if($company->country != "" && $company->country != null) {
                $company->country = decrypt($company->country);
            }
            $company->phone = decrypt($company->phone);

            if($company->email != "" && $company->email != null){
                $company->email = decrypt($company->email);
            }

            if($company->iban != "" && $company->iban != null){
                $company->iban = decrypt($company->iban);
            }

            if($company->bic != "" && $company->bic != null){
                $company->bic = decrypt($company->bic);
            }

            if($company->smtp_server != "" && $company->smtp_server != null){
                $company->smtp_server = decrypt($company->smtp_server);
            }

            if($company->smtp_user != "" && $company->smtp_user != null){
                $company->smtp_user = decrypt($company->smtp_user);
            }

            if($company->smtp_password != "" && $company->smtp_password != null){
                $company->smtp_password = decrypt($company->smtp_password);
            }

            if($company->smtp_from_email != "" && $company->smtp_from_email != null){
                $company->smtp_from_email = decrypt($company->smtp_from_email);
            }

            if($company->website !="" && $company->website != null){
                $company->website = decrypt($company->website);
            }

            if($company->tax_id !="" && $company->tax_id != null){
                $company->tax_id = decrypt($company->tax_id);
            }
        }
        return $company;
    }
}
