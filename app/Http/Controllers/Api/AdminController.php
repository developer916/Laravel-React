<?php

namespace App\Http\Controllers\Api;

use App\Calendar;
use App\CalendarCategory;
use App\Category;
use App\Company;
use App\Event;
use App\EventReminder;
use App\HtmlGenerate;
use App\Http\Requests\AdminStoreUser;
use App\Http\Requests\DeactivateCompany;
use App\Http\Requests\LicenseModelRequest;
use App\Http\Requests\StoreCompany;
use App\Http\Requests\StorePasswordInfo;
use App\Http\Requests\StoreUser;
use App\LicenseModel;
use App\Maintenance;
use App\MapAnalyse;
use App\Subscriber;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    // Users list
    public function userList(Request $request){
        $users = User::where('role','!=' ,'admin')->where('company_id', '!=', 0)->get();
        $companies = Company::all();
        if(count($users) > 0){
            foreach ($users as $key => $value) {
                $value->name = $this->decryptValue($value->name);
                if($value->company_id != 0){
                    $value->company_name = $this->decryptValue($value->company->name);
                }
            }
        }
        $decryptCompanies = array();
        if(count($companies)>0){
            foreach ($companies as $key => $company){
                $decryptCompanies[$key] = $this->decryptCompany($company);
            }
        }
        return response()->json(['status' =>'success', 'users' => $users, 'companies' => $decryptCompanies], 200);
    }

    //get user
    public function getUser(Request $request){
        $user = User::where('id', $request->id)->first();
        if($user){
            $user->name = $this->decryptValue($user->name);
        }
        return response()->json(['status' => 'success', 'user' => $user], 200);
    }

    //delete user

    public function deleteUser(Request $request){
        $id = $request->get('id');
        User::where('id', $id)->delete();
        return response()->json(['status' =>'success', 'user_id' => $request->id], 200);
    }

    //Store User
    public function storeUser(AdminStoreUser $request){
        $data = $request->all();
        if($data['name'] !=""){
            $data['name'] = $this->encryptValue($data['name']);
        }
        if($request->has('change_password') ) {
            unset($data['change_password']);
        }
        if($request->user_id != '') {
            if(isset($data['user_id'])){
                unset($data['user_id']);
            }
            if($request->has('change_password')  && $request->get('change_password') == 1){
                User::where('id', $request->user_id)->update([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' =>bcrypt($data['password']),
                    'company_id' => $data['company_id'],
                    'status' => $data['status'],
                    'role' => $data['role']

                ]);
            } else {
                User::where('id', $request->user_id)->update([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'company_id' => $data['company_id'],
                    'status' => $data['status'],
                    'role' => $data['role']
                ]);
            }
            $user = User::where('id', $request->user_id)->first();
        }else{
            $user= User::create([
                'name'          => $data['name'],
                'email'         => $data['email'],
                'password'      => bcrypt($data['password']),
                'company_id'    => $data['company_id'],
                'role'          => $data['role'],
                'status'        => 'active'
            ]);
        }

        if($user){
            $user->name = $this->decryptValue($user->name);
        }

        return response()->json(['status' => 'success', 'user' => $user], 200);
    }

    public function deactivateUser(Request $request){
        $user = User::where('id', $request->id)->first();
        $active = $request->get('active');
        $user->update(['status' =>$active]);
        return response()->json(['status'=>'success', 'user' => $user], 200);
    }

    //Company List
    public function companyList(Request $request){
        $companies = Company::with('licenseModel')->get();
        $decryptCompanies = array();
        if(count($companies) >0){
            foreach ($companies as $key => $company){
                $decryptCompany = $this->decryptCompany($company);
                $decryptCompanies[$key] = $decryptCompany;
            }
        }
        return response()->json(['status' => 'success', 'companies' => $decryptCompanies], 200);
    }


    //get company

    public function getCompany(Request $request){
        $company = Company::where('id', $request->id)->with('licenseModel')->first();
        if($company){
            $company = $this->decryptCompany($company);
        }
        return response()->json(['status' => 'success', 'company' => $company], 200);
    }

    public function deleteCompany(Request $request){
        $id = $request->get('id');
        Event::where('company_id', $id)->delete();
        HtmlGenerate::where('company_id', $id)->delete();
        EventReminder::where('company_id', $id)->delete();
        Subscriber::where('company_id', $id)->delete();
        MapAnalyse::where('company_id', $id)->delete();
        Calendar::where('company_id', $id)->delete();
        User::where('company_id', $id)->delete();
        Company::where('id', $id)->delete();
        return response()->json(['status' =>'success'], 200);
    }
    //new company store

    public function storeCompany(Request $request){
        $companyInfo = $request->all();
        $encryptedCompanyInfo = array();
        $encryptedCompanyInfo = $companyInfo;
        if(count($companyInfo) >0){
            $encryptedCompanyInfo['name'] = $this->encryptValue($companyInfo['name']);
            $encryptedCompanyInfo['street'] = $this->encryptValue($companyInfo['street']);
            $encryptedCompanyInfo['postal_code'] = $this->encryptValue($companyInfo['postal_code']);
            $encryptedCompanyInfo['city'] = $this->encryptValue($companyInfo['city']);
            $encryptedCompanyInfo['country'] = $this->encryptValue($companyInfo['country']);
            $encryptedCompanyInfo['phone'] = $this->encryptValue($companyInfo['phone']);
            $encryptedCompanyInfo['email'] = $this->encryptValue($companyInfo['email']);
            $encryptedCompanyInfo['iban'] = $this->encryptValue($companyInfo['iban']);
            $encryptedCompanyInfo['bic'] = $this->encryptValue($companyInfo['bic']);
            $encryptedCompanyInfo['search_name'] = ($companyInfo['name']);
            if($companyInfo['website'] !=""){
                $encryptedCompanyInfo['website'] = $this->encryptValue($companyInfo['website']);
            }

            if($companyInfo['tax_id'] !=""){
                $encryptedCompanyInfo['tax_id'] = $this->encryptValue($companyInfo['tax_id']);
            }

            if($companyInfo['smtp_server'] != ""){
                $encryptedCompanyInfo['smtp_server'] = encrypt($companyInfo['smtp_server']);
            }

            if($companyInfo['smtp_user'] != ""){
                $encryptedCompanyInfo['smtp_user'] = encrypt($companyInfo['smtp_user']);
            }

            if($companyInfo['smtp_password'] != ""){
                $encryptedCompanyInfo['smtp_password'] = encrypt($companyInfo['smtp_password']);
            }

            if($companyInfo['smtp_from_email'] != ""){
                $encryptedCompanyInfo['smtp_from_email'] = encrypt($companyInfo['smtp_from_email']);
            }

            if($companyInfo['license_model']){
               $encryptedCompanyInfo['license_model'] = $companyInfo['license_model']['id'];
            }
        }

        if($request->id) {
            if(isset($encryptedCompanyInfo['id'])){
                unset($encryptedCompanyInfo['id']);
            }
            Company::where('id', $request->id)->update($encryptedCompanyInfo);
            $company = Company::where('id', $request->id)->with('licenseModel')->first();
            if($company){
                $company = $this->decryptCompany($company);
                $users = User::where('company_id', $request->id)->get();
                if(count($users) >0){
                    foreach ($users as $key=> $user){
                        $user->update(['status' =>$company->status]);
                    }
                }
            }
        } else {
            $company = Company::create($encryptedCompanyInfo);
        }
        return response()->json(['status'=>'success', 'company' => $company], 200);


//        if($request->id) {
//            if(isset($companyInfo['id'])){
//                unset($companyInfo['id']);
//            }
//            Company::where('id', $request->id)->update($companyInfo);
//            $company = Company::where('id', $request->id)->first();
//        } else {
//            $company = Company::create($companyInfo);
//        }
//        return response()->json(['status'=>'success', 'company' => $company], 200);
    }

    //ability deactivate company

    public function deactivateCompany(DeactivateCompany $request){
        $users = User::where('company_id', $request->company_id)->get();
        $active = $request->get('active');
         Company::where('id', $request->company_id)->update([
            'status' => $active
        ]);

        foreach ($users as $key=> $user){
            $user->update(['status' =>$active]);
        }
        $company = Company::where('id', $request->company_id)->with('licenseModel')->first();
        if($company){
            $company = $this->decryptCompany($company);
        }
        return response()->json(['status'=>'success','company' => $company], 200);
    }



    // license model create and edit function

    public function storeLicenseModel(LicenseModelRequest $request){
        $modelInfo = $request->all();
        if($request->id){
            LicenseModel::where('id', $modelInfo['id'])->update($modelInfo);
            $license = LicenseModel::where('id', $modelInfo['id'])->first();
        } else {
            $license = LicenseModel::create($modelInfo);
        }
        return response()->json(['status' => 'success', 'license' => $license], 200);
    }


    // license model delete

    public function deleteLicenseModel(Request $request){
        $id = $request->get('id');
        LicenseModel::where('id', $id)->delete();
        return response()->json(['status' => 'success'], 200);
    }

    //get all license model

    public function getAllLicenseModel(Request $request){
        $licenseModels = LicenseModel::all();
        return response()->json(['status' =>'success', 'models' => $licenseModels], 200);
    }

    //set company license model

    public function setCompanyLicenseModel(Request $request){
        $companyInfo = $request->all();
        $companyID = $request->get('company_id');
        $licenseExpirationDate = new Carbon($request->expiration_date);
        $companyInfo['license_expire_date'] = $licenseExpirationDate->toDateString();
        $companyInfo['license_model'] = $request->license_model;
        Company::where('id', $companyID)->update($companyInfo);
        return response()->json(['status' => 'success'], 200);
    }


    //get license model

    public function getLicenseModel(Request $request){
        $license = LicenseModel::where('id', $request->id)->first();
        return response()->json(['status' =>'success', 'license' => $license], 200);
    }

    public function getCompanySettings(Request $request) {
        $settings = Company::where('id', $request->id)->with('licenseModel')->first();
        if($settings){
            $settings = $this->decryptCompany($settings);
        }
        $licenses = LicenseModel::all();
        return response()->json([
            'status' =>'success',
            'data' => [
                'settings' => $settings,
                'licenses' => $licenses
            ], 200]);
    }

    public function updateCompanySettings(Request $request) {
        $company = Company::where('id', $request->company_id)->first();
        if ($request->has('license_model')) {
            $company->license_model = $request->license_model;
        }
        $company->save();
        $settings = Company::where('id', $request->company_id)->with('licenseModel')->first();
        $licenses = LicenseModel::all();
        return response()->json([
            'status' =>'success',
            'data' => [
                'settings' => $settings,
                'licenses' => $licenses
            ], 200]);
    }

    //update password

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

    public function updateMaintenance(Request $request){
        $user = $request->user();
        if($user->role == 'admin'){
            $maintenance = Maintenance::all();
            if(count($maintenance) >0){
                Maintenance::where('id', $maintenance[0]->id)->update([
                    'confirm' => $request->get('confirm')
                ]);
            } else {
                Maintenance::create([
                    'confirm' => $request->get('confirm')
                ]);
            }
            return response()->json(['status' => 'success', 'maintenance' => $request->get('confirm')], 200);

        } else {
            return response()->json([
                'error' => 'invalid_credentials',
                'message' => "You can not change maintenance"
            ], 401);
        }
    }

    public function getMaintenance(Request $request){
        $user = $request->user();
        if($user->role == 'admin') {
            $maintenances = Maintenance::all();
            if (count($maintenances) > 0) {
                $maintenace = $maintenances[0]->confirm;
            } else {
                $maintenace = 'false';
            }
            return response()->json(['status' => 'success', 'maintenance' => $maintenace] , 200);
        } else {
            return response()->json([
                'error' => 'invalid_credentials',
                'message' => "You can not change maintenance"
            ], 401);
        }
    }

    public function getCalendars(Request $request){
        $calendars = Calendar::all();
        return response()->json(['status' => 'success', 'calendars' => $calendars]);
    }


    //get call categories

    public function getCategories(Request $request){
        $categories = Category::all();
        return response()->json(['status' => 'success', 'categories' => $categories]);
    }

    //save category

    public function storeCategory(Request $request){
        $data = $request->all();
        $data['flag'] = str_replace(' ', '_', $request->name);

        if($request->id){
            if(isset($data['id'])){
                unset($data['id']);
            }
            $category = Category::where('id', $request->get('id'))
                ->update($data);
        } else {
            $category =  Category::create($data);
        }

        return response()->json(['status' => 'success', 'category' => $category]);
    }

    //get category
    public function getCategory(Request $request){
        $category = Category::where('id', $request->get('id'))->first();
        return response()->json(['status' =>'success', 'category' => $category]);
    }

    //delete category
    public function deleteCategory(Request $request){
        if($request->has('id')){
          CalendarCategory::where('category_id', $request->id)->delete();
          Category::where('id', $request->id)->delete();
          return response()->json(['status' =>'success'], 200);
        }
    }

    public function decryptCompany($company)
    {
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

    public function encryptValue($string){
        return encrypt($string);
    }
    public function decryptValue($string){
        return decrypt($string);
    }
}
