<?php


namespace App\Http\Controllers;
use App\Calendar;
use App\Subscriber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ICSController extends Controller{


    public function getICS( $fileName){
        $getUUIDArray = explode("/",$fileName);
        $uuid =null;
        $calendarHashOrICSFile ="";
        if(count($getUUIDArray)>1) {
            $uuid = $getUUIDArray[0];
            $calendarHashOrICSFile = $getUUIDArray[1];
        } else {
            $calendarHashOrICSFile = $fileName;
        }

        $list = explode(".",$calendarHashOrICSFile);
        $download = 0;
        if(count($list) >1){
            $hashCode = $list[0];
            $calendar = Calendar::where('hash_code', $hashCode)->first();
            if($uuid != null && $calendar){
                $subscriber = Subscriber::where('uuid', $uuid)->where('calendar_id', $calendar->id)->first();
                if($subscriber){
                    if($subscriber->deleted == 0){
                        $download = 1;
                    }
                } else {
                    $download =1;
                }
            } else {
                $download = 1;
            }

            if($download == 1){
                if($calendar){
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
                    $headers = ['Content-type: text/calendar; charset=utf-8'];
                    return response()->download($calendarICSFile, basename($calendarIcsFileName.".ics"), $headers);
                }
            } else {
                echo "Your account suspeneded for this calendar by company";
            }

        } else {
            $calendar = Calendar::where('hash_code', $calendarHashOrICSFile)->first();
            if($uuid != null && $calendar){
                $subscriber = Subscriber::where('uuid', $uuid)->where('calendar_id', $calendar->id)->first();
                if($subscriber){
                    if($subscriber->deleted == 0){
                        $download = 1;
                    }
                }
            } else {
                $download = 1;
            }
            if($download == 1){
                if($calendar) {
                    $ical = new IcsClass();
                    $content = $ical->getICAL($calendar->id);
                    echo $content;
                }
            } else {
                echo "Your account suspeneded for this calendar by company";
            }

        }

    }
}