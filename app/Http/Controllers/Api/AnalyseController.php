<?php

namespace App\Http\Controllers\Api;

use App\MapAnalyse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

use DB;
class AnalyseController extends Controller
{
    public  function getMapData(Request $request) {
        $sql = "select count(id) as value , mat.code, mat.name  from map_analyse as mat  where mat.company_id =  ". $request->get('company_id');
        $sql_max = "SELECT COUNT(id) AS counted FROM map_analyse as mat where company_id = "    . $request->get('company_id');
        if($request->get('calendar_id')){
            $sql .= " and mat.calendar_id = " . $request->get('calendar_id');
            $sql_max .= " and calendar_id = ". $request->get('calendar_id');
        }

        if($request->get('type') =="week"){
            $startWeek = Carbon::now()->subWeek();
            $endWeek = Carbon::now();
            $sql.= " and mat.updated_at > '$startWeek' and mat.updated_at < '$endWeek'";
            $sql_max .= " and mat.updated_at > '$startWeek' and mat.updated_at < '$endWeek'";
        } else if($request->get('type') == "month"){
            $startMonth = Carbon::now()->subMonth();
            $endMonth = Carbon::now();
            $sql.= " and mat.updated_at > '$startMonth' and mat.updated_at < '$endMonth'";
            $sql_max.= " and mat.updated_at > '$startMonth' and mat.updated_at < '$endMonth'";
        } else if($request->get('type') =="year"){
            $startYear = Carbon::now()->subYear();
            $endYear = Carbon::now();
            $sql.= " and mat.updated_at > '$startYear' and mat.updated_at < '$endYear'";
            $sql_max .= " and mat.updated_at > '$startYear' and mat.updated_at < '$endYear'";
        }
        $sql .=" group by mat.name";
        $sql_max .= " group by name";
        $data = DB::select($sql);

        $max = DB::select("SELECT MAX(counted) as max_value FROM ( ".$sql_max.") AS count_table");
        return response()->json(['status' => 'success', 'data' => $data, 'max' => $max]);
    }


    public function getSubscribers(Request $request) {
        $data = [];
        $user = $request->user();
        $type= $request->type;
        $endDate = Carbon::now()->toDateString();
        if($type == 'week') {
            $startDate = Carbon::now()->subWeek()->toDateString();
        } else if($type == 'month'){
            $startDate = Carbon::now()->subMonth()->toDateString();
        } else if($type == 'year'){
            $startDate = Carbon::now()->subYear()->toDateString();
        } else {
            $getStartDate = MapAnalyse::orderBy('updated_at', 'ASC')->first();
            if($getStartDate) {
                $startDate = $getStartDate->updated_at;
            } else {
                $startDate = Carbon::now()->subMonth()->toDateString();
            }
        }

        if($user->role != "admin") {
            $sql = " select count(id) as value  from map_analyse where company_id = " . $user->company_id;
            if($request->get('calendar_id')) {
                $sql .= " and  calendar_id = " . $request->get('calendar_id');
            }
            if($type == "year"){
                for($i =11; $i >=0; $i--){
                    $startDay = Carbon::now()->subMonth($i)->startOfMonth();
                    $endDay = Carbon::now()->subMonth($i)->endOfMonth();
                    $select_query = $sql . " and (  updated_at >  '$startDay' and  updated_at < '$endDay' ) ";
                    $result = DB::select($select_query);
                    if(count($result)>0) {
                        $data[11- $i] = $result[0]->value;
                    } else{
                        $data[11- $i] = 0;
                    }
                }

            } else {
                $period = CarbonPeriod::create($startDate, $endDate);
                foreach($period as $key =>$date) {
                    $startDay = $date->format('Y-m-d H:i:s');
                    $endDay = $date->endOfDay();
                    $select_query = $sql . " and (  updated_at >  '$startDay' and  updated_at < '$endDay' ) ";
                    $result = DB::select($select_query);
                    if(count($result)>0) {
                        $data[$key] = $result[0]->value;
                    } else{
                        $data[$key] = 0;
                    }
                }
            }


        } else if($user->role == "admin"){

            if($type=="year"){
                for($i = 11; $i >=0; $i--){
                    $startDay = Carbon::now()->subMonth($i)->startOfMonth();
                    $endDay = Carbon::now()->subMonth($i)->endOfMonth();
                    $sql = "select count(id) as value  from map_analyse where updated_at >  '$startDay' and  updated_at < '$endDay'";
                    if($request->get('calendar_id')) {
                        $sql .= " and  calendar_id = " . $request->get('calendar_id');
                    }
                    $sql .= "  GROUP  BY  company_id";

                    $result = DB::select($sql);
                    if(count($result)>0) {
                        $data[11- $i] = $result[0]->value;
                    } else{
                        $data[11- $i] = 0;
                    }
                }
            } else {
                $period = CarbonPeriod::create($startDate, $endDate);
                foreach ($period as $key => $date) {
                    $startDay = $date->format('Y-m-d H:i:s');
                    $endDay = $date->endOfDay();
                    $sql = "select count(id) as value  from map_analyse where updated_at >  '$startDay' and  updated_at < '$endDay'";
                    if($request->get('calendar_id')) {
                        $sql .= " and  calendar_id = " . $request->get('calendar_id');
                    }
                    $sql .= "  GROUP  BY  company_id";

                    $result = DB::select($sql);
                    if (count($result) > 0) {
                        $data[$key] = $result[0]->value;
                    } else {
                        $data[$key] = 0;
                    }
                }
            }
        }
        return response()->json(['status' => 'success', 'data' => $data]);
    }
}
