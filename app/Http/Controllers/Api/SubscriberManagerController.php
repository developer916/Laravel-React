<?php

namespace App\Http\Controllers\Api;

use App\Subscriber;
use App\SubscriberLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SubscriberManagerController extends Controller
{
    public function getSubscribers(Request $request) {
        $user = $request->user();
        $subscribers = Subscriber::with('calendar')->where('company_id', $user->company_id)->where('deleted', 0)->get();
        if(count($subscribers) >0){
            foreach ($subscribers as $key => $subscriber){
                $subscriber->name= decrypt($subscriber->name);
                $subscriber->email= decrypt($subscriber->email);
            }
        }
        return response()->json(['status' => 'success', 'subscribers' => $subscribers]);
    }

    public function getSubscriber(Request $request) {
        $user = $request->user();
        $subscriber = Subscriber::where('id', $request->id)->with('calendar')->first();
        if($user->company_id == $subscriber->company_id){
            $subscriber->name = decrypt($subscriber->name);
            $subscriber->email = decrypt($subscriber->email);
            return response()->json(['status' => 'success', 'subscriber' => $subscriber], 200);
        } else {
            return response()->json(['status'=> 'failed'], 401 );
        }

    }

    public function deleteSubscriber(Request $request) {
        $user = $request->user();
        $subscriber = Subscriber::where('id', $request->id)->with('calendar')->first();
        if($user->company_id == $subscriber->company_id){
//            Subscriber::where('id', $request->id)->delete();
            Subscriber::where('id', $request->id)->update(['deleted' => 1]);
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status'=> 'failed'], 401 );
        }

    }

    public function storeSubscribe(Request $request){
        $subscribeInfo = $request->all();
        unset($subscribeInfo['calendar']);
        if($subscribeInfo['name'] != ""){
            $subscribeInfo['name'] = encrypt($subscribeInfo['name']);
        }

        if($subscribeInfo['email'] != ""){
            $subscribeInfo['email'] = encrypt($subscribeInfo['email']);
        }

        $subscribe = Subscriber::where('id', $request->get('id'))->update($subscribeInfo);
        $subscriber = Subscriber::where('id', $request->get('id'))->with('calendar')->first();
        $subscriber->name = decrypt($subscriber->name);
        $subscriber->email = decrypt($subscriber->email);
        return response()->json(['status' => 'success', 'subscriber' => $subscriber]);
    }

    public function getSubscribeLogs(Request $request){
        $subscribeLogs = SubscriberLog::where('subscriber_id', $request->get('subscriber_id'))->get();
        return response()->json(['status' => 'success', 'logs' => $subscribeLogs], 200);
    }

}
