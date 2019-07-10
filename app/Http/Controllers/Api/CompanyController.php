<?php

namespace App\Http\Controllers\Api;

use App\Calendar;
use App\Event;
use App\Http\Controllers\Controller;

use App\Http\Requests\StoreCompanyInfo;
use App\Http\Requests\StoreCompanyBankInfo;
use App\Company;

use App\Http\Requests\StoreCompanySmtpInfo;
use App\Http\Requests\StorePasswordInfo;
use App\Jobs\EmailSend;
use App\MapAnalyse;
use App\User;
use Illuminate\Support\Facades\URL;
Use Illuminate\Support\Str;
use Carbon\Carbon;

use Illuminate\Http\Request;
use DB;
use Carbon\CarbonPeriod;

class CompanyController extends Controller
{
    public function updateCompanyAddress(StoreCompanyInfo $request) {
        if($request->has('user_id')) {
            $user = User::where('id', $request->get('user_id'))->first();
        }else{
            $user = $request->user();
        }


        if($user) {
            $companyInfo = $request->all();
            $insertCompanyInfo = array();
            $insertCompanyInfo = $companyInfo;
            $insertCompanyInfo['user_id'] = $companyInfo['user_id'];
            $insertCompanyInfo['name'] = encrypt($companyInfo['name']);
            $insertCompanyInfo['street'] = encrypt($companyInfo['street']);
            $insertCompanyInfo['postal_code'] = encrypt($companyInfo['postal_code']);
            $insertCompanyInfo['city'] = encrypt($companyInfo['city']);
            $insertCompanyInfo['country'] = encrypt($companyInfo['country']);
            $insertCompanyInfo['phone'] = encrypt($companyInfo['phone']);
            $insertCompanyInfo['email'] = encrypt($companyInfo['email']);
            $insertCompanyInfo['search_name'] = $companyInfo['name'];
            if($companyInfo['website'] !=""){
                $insertCompanyInfo['website'] = encrypt($companyInfo['website']);
            }
            if($companyInfo['tax_id'] !=""){
                $insertCompanyInfo['tax_id'] = encrypt($companyInfo['tax_id']);
            }
            $insertCompanyInfo['description'] = ($companyInfo['description']);


            $insertCompanyInfo['email'] = empty($insertCompanyInfo['email']) ? $user->email : $insertCompanyInfo['email'];
            if ($user->company_id == 0) {
                $insertCompanyInfo['status'] = 'inactive';
                $company = Company::create($insertCompanyInfo);

                $user->company_id = $company->id;
                $user->save();
            } else {
                if(isset($insertCompanyInfo['user_id'])){
                    unset($insertCompanyInfo['user_id']);
                }

                Company::where('id', $user->company_id)
                    ->update($insertCompanyInfo);
            }

//            $companyInfo['email'] = empty($companyInfo['email']) ? $user->email : $companyInfo['email'];
//            if ($user->company_id == 0) {
//                $companyInfo['status'] = 'inactive';
//                $company = Company::create($companyInfo);
//
//                $user->company_id = $company->id;
//                $user->save();
//            } else {
//                if(isset($companyInfo['user_id'])){
//                    unset($companyInfo['user_id']);
//                }
//
//                Company::where('id', $user->company_id)
//                    ->update($companyInfo);
//            }
            $company = $this->decryptCompany($user->company);

            return response()->json(['status'=>'success', 'company' =>$company ], 200);
        }else{
            return response()->json(['status' =>'failed', 'message' => 'Can not find user'], 401);
        }
    }

    public function updateCompanyBankInformation(StoreCompanyBankInfo $request){
        //Update company bank information

        $companyBankInfo = $request->all();

        if($request->has('user_id')) {
            $user = User::where('id', $request->get('user_id'))->first();
        }else{
            $user = $request->user();
        }

        $insertCompanyBankInfo = array();
        $insertCompanyBankInfo = $companyBankInfo;
        $insertCompanyBankInfo['iban'] = encrypt($companyBankInfo['iban']);
        $insertCompanyBankInfo['bic'] = encrypt($companyBankInfo['bic']);

        if($user){
            $update = 0;
            if(isset($insertCompanyBankInfo['user_id'])){
                unset($insertCompanyBankInfo['user_id']);
            }

            if(isset($insertCompanyBankInfo['update_sepa'])){
                unset($insertCompanyBankInfo['update_sepa']);
                $update = 1;
            }


            Company::where('id', $user->company_id)
                ->update($insertCompanyBankInfo);
            if($update == 0){
                // Create confirmation link
                $token = $this->getToken();
                $confirmationLink =URL::to('/').'/confirmation/'.$token;

                //mail send function
                $subject = trans('company.registration_confirmation');
                $message = trans('company.registration_confirmation_body', ['confirm_url' => $confirmationLink]);

                $this->dispatch(new EmailSend($user, $subject, $message));

                //update user status & remember token
                User::where('id', $user->id)->update([
                    'status' => 'unverified',
                    'remember_token' => $token
                ]);

                if($user->role == "admin"){
                    Company::where('id', $user->company_id)->update([
                        'status' => 'unverified'
                    ]);
                }

                return response()->json(['status'=>'success', 'confirmationLink' => $confirmationLink, 'message' => \Lang::get('company.registration_confirmation')], 200);
            } else {
                return response()->json(['status' => 'success' ], 200);
            }

        }else{
            return response()->json(['status' =>'failed' , 'message' => 'Can not find user'], 401);
        }
//        if($user){
//            $update = 0;
//            if(isset($companyBankInfo['user_id'])){
//                unset($companyBankInfo['user_id']);
//            }
//
//            if(isset($companyBankInfo['update_sepa'])){
//                unset($companyBankInfo['update_sepa']);
//                $update = 1;
//            }
//
//            Company::where('id', $user->company_id)
//                ->update($companyBankInfo);
//            if($update == 0){
//                // Create confirmation link
//                $token = $this->getToken();
//                $confirmationLink =URL::to('/').'/confirmation/'.$token;
//
//                //mail send function
//                $subject = trans('company.registration_confirmation');
//                $message = trans('company.registration_confirmation_body', ['confirm_url' => $confirmationLink]);
//
//                $this->dispatch(new EmailSend($user, $subject, $message));
//
//                //update user status & remember token
//                User::where('id', $user->id)->update([
//                    'status' => 'unverified',
//                    'remember_token' => $token
//                ]);
//
//                if($user->role == "admin"){
//                    Company::where('id', $user->company_id)->update([
//                        'status' => 'unverified'
//                    ]);
//                }
//
//                return response()->json(['status'=>'success', 'confirmationLink' => $confirmationLink, 'message' => \Lang::get('company.registration_confirmation')], 200);
//            } else {
//                return response()->json(['status' => 'success' ], 200);
//            }
//
//        }else{
//            return response()->json(['status' =>'failed' , 'message' => 'Can not find user'], 401);
//        }
    }

    public function getToken() {
        do {
            $token = Str::random(32);
            $user = User::where('remember_token', $token)->get();
        }
        while(count($user) > 0);
        return $token;
    }

    public function storeCompanySmtpInformation(StoreCompanySmtpInfo $request){
        $user = $request->user();
        $companySmtpInfo = $request->all();
        if($companySmtpInfo['smtp_server'] != ""){
            $companySmtpInfo['smtp_server'] = encrypt($companySmtpInfo['smtp_server']);
        }

        if($companySmtpInfo['smtp_user'] != ""){
            $companySmtpInfo['smtp_user'] = encrypt($companySmtpInfo['smtp_user']);
        }

        if($companySmtpInfo['smtp_password'] != ""){
            $companySmtpInfo['smtp_password'] = encrypt($companySmtpInfo['smtp_password']);
        }

        if($companySmtpInfo['smtp_from_email'] != ""){
            $companySmtpInfo['smtp_from_email'] = encrypt($companySmtpInfo['smtp_from_email']);
        }

        Company::where('id', $user->company_id)->update($companySmtpInfo);
        return response()->json(['status' => 'success'], 200);
    }

    public function updatePassword(StorePasswordInfo $request){
        $user = $request->user();
        $data = $request->all();
        if(\Hash::check($data['current_password'], $user->password)){
            User::where('id', $user->id)->update([
                'password' =>bcrypt($data['password'])
            ]);
            return response()->json(['status' =>'success'], 200);
        }else{
            return response()->json([
                'error' => 'invalid_credentials',
                'message' => "Your current password is incorrect."
            ], 401);
        }
    }

    public function getDashboardData(Request $request){
        $user = $request->user();
            $calendar_data = [];
            $subscribers_data = [];
            $endDate = Carbon::now()->toDateString();
            $startDate = Carbon::now()->subWeek()->toDateString();
            $startWeek = Carbon::now()->startOfWeek();
            $endWeek = Carbon::now()->endOfWeek();

            if($user->role != "admin") {
                if ($request->has('search')) {
                    $search = $request->get('search');
                    $calendars = Calendar::where('company_id', $user->company_id)
                        ->where(function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                            $query->orWhere('description', 'like', '%' . $search . '%');
                        })->get();
                } else {
                    $calendars = Calendar::where('company_id', $user->company_id)->get();
                }
            } else {
                if ($request->has('search')) {
                    $search = $request->get('search');
                    $calendars = Calendar::where(function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                            $query->orWhere('description', 'like', '%' . $search . '%');
                        })->get();
                } else {
                    $calendars = Calendar::all();
                }
            }

            if(count($calendars) >0){
                foreach($calendars as $key =>$calendar){
                    $calendar_data[$key]['id'] = $calendar->id;
                    $calendar_data[$key]['picture'] =$calendar->picture;
                    $calendar_data[$key]['name'] =$calendar->name;
                    $calendar_data[$key]['description'] = $calendar->description;
                    $calendar_data[$key]['hash_code'] = $calendar->hash_code;
                    $calendar_data[$key]['public'] = $calendar->public;
                    $created_at = new Carbon($calendar->created_at);
                    $calendar_data[$key]['time'] = $created_at->toDateTimeString();

                    $sql_week_value = "select count(id) as value  from map_analyse where updated_at >  '$startWeek' and  updated_at < '$endWeek' and calendar_id = " . $calendar->id;
                    $result = DB::select($sql_week_value);
                    if(count($result)>0) {
                        $calendar_data[$key]['week_subscriber'] = $result[0]->value;
                    }else {
                        $calendar_data[$key]['week_subscriber']  = 0;
                    }
                    $sql_total_value = "select count(id) as value  from map_analyse where calendar_id = " . $calendar->id;
                    $result = DB::select($sql_total_value);
                    if(count($result)>0) {
                        $calendar_data[$key]['total_subscriber'] = $result[0]->value;
                    }else {
                        $calendar_data[$key]['total_subscriber']  = 0;
                    }

                    $period = CarbonPeriod::create($startDate, $endDate);
                    foreach($period as $key_period =>$date) {
                        $startDay = $date->format('Y-m-d H:i:s');
                        $endDay = $date->endOfDay();
                        $select_query = " select count(id) as value  from map_analyse where calendar_id = ".$calendar->id." and (  updated_at >  '$startDay' and  updated_at < '$endDay' ) ";
                        $result = DB::select($select_query);
                        if(count($result)>0) {
                            $subscribers_data[$key][$key_period] = $result[0]->value;
                        } else{
                            $subscribers_data[$key][$key_period] = 0;
                        }
                    }
                }
            }
            if($user->role != 'admin'){
                $upcoming_events = Event::where('date_to', '>=' , Carbon::now())->where('company_id', $user->company_id)->get();
            } else {
//                $upcoming_events = Event::leftJoin('calendars', 'events.calendar_id', '=', 'calendars.id')->select('events.*', 'calendars.name')->where('events.date_to', '>=' , Carbon::now())->get();
                $upcoming_events = Event::where('date_to', '>=' , Carbon::now())->with('calendar')->get();
            }


            return response()->json(['status' => 'success', 'calendar_data' => $calendar_data, 'subscribers_data' => $subscribers_data, 'upcoming_events' => $upcoming_events]);
    }

    public function getEventByCalendar(Request $request){
        $user =$request->user();
        $event_data = [];
        $calendar_search = $request->get('calendar_search');
        if($calendar_search != ""){
            if($calendar_search == "all"){
                $events = Event::where('company_id', $user->company_id)->get();
            } else {
                $events = Event::where('calendar_id', $calendar_search)->get();
            }
            if(count($events) >0){
                $event_data = $this->getEventDetails($events);
            }
            return response()->json(['status' =>'success', 'event_data' => $event_data], 200);
        } else {
            return response()->json(['status' =>'failed', 'message' =>'Can not get events'], 401);
        }
    }
    public function getEvents(Request $request){
        $user =$request->user();
        $upcoming_data = [];
        $past_data = [];
        $now = Carbon::now();
        $search = $request->get('search');
        if($user->role != "admin"){
            if(!empty($search)) {
                 $upcoming_events = Event::where('company_id', $user->company_id)->where('date_to', '>=', $now)->where('summary', 'like', '%'.$search.'%')->get();
                 $past_events = Event::where('company_id', $user->company_id)->where('date_to', '<=', $now)->where('summary', 'like', '%'.$search.'%')->get();
            } else {
                $upcoming_events = Event::where('company_id', $user->company_id)->where('date_to', '>=', $now)->get();
                $past_events = Event::where('company_id', $user->company_id)->where('date_to', '<=', $now)->get();
            }
            if (count($upcoming_events) > 0) {
                $upcoming_data = $this->getEventDetails($upcoming_events);
            }
            if (count($past_events) > 0) {
                $past_data = $this->getEventDetails($past_events);
            }
            return response()->json(['status' =>'success', 'upcoming_data' => $upcoming_data, 'past_data' => $past_data]);
        }
    }

    public function getEventDetails($events){
        $return_data = [];
        $startWeek = Carbon::now()->startOfWeek();
        $endWeek = Carbon::now()->endOfWeek();
        foreach ($events as $key => $event){
            $return_data[$key]['id'] = $event->id;
            $return_data[$key]['summary'] = $event->summary;
            $date_to = new Carbon($event->date_to);
            $return_data[$key]['date_to'] = $date_to->toDateTimeString();
            $date_from = new Carbon($event->date_from);
            $return_data[$key]['date_from'] = $date_from->toDateTimeString();
            $calendar = $event->calendar;
            $sql_week_value = "select count(id) as value  from map_analyse where updated_at >  '$startWeek' and  updated_at < '$endWeek' and calendar_id = " . $calendar->id;
            $result = DB::select($sql_week_value);
            if(count($result)>0) {
                $return_data[$key]['week_subscriber'] = $result[0]->value;
            }else {
                $return_data[$key]['week_subscriber']  = 0;
            }
            $sql_total_value = "select count(id) as value  from map_analyse where calendar_id = " . $calendar->id;
            $result = DB::select($sql_total_value);
            if(count($result)>0) {
                $return_data[$key]['total_subscriber'] = $result[0]->value;
            }else {
                $return_data[$key]['total_subscriber']  = 0;
            }
            $created_at = new Carbon($calendar->created_at);
            $return_data[$key]['calendar'] = ['id' => $calendar->id, 'name' => $calendar->name, 'picture' => $calendar->picture, 'hash_code' => $calendar->hash_code, 'not' =>$calendar->not];
            $return_data[$key]['time'] = $created_at->toDateTimeString();
        }
        return $return_data;
    }

    public function getCompanyInfo(Request $request){
        if($request->has('company_id')){
            $company =Company::where('id', $request->get('company_id'))->first();
            $company = $this->decryptCompany($company);

            return response()->json(['status' =>'success', 'company' => $company], 200);
        } else {
            return response()->json(['status' => 'failed', 'message' => 'Can not find company'], 401);
        }
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
