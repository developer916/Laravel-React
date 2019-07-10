<?php

namespace App\Http\Controllers\Api;

use App\HtmlGenerate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HtmlGenerateController extends Controller
{

    public function storeHtmlGenerate(Request $request){
        $user = $request->user();
        $html_code = HtmlGenerate::where('company_id', $user->company_id)
            ->where('calendar_id', $request->calendar_id)
            ->where('type', $request->template_type)
            ->first();
        if (empty($html_code)) {
            $html_code = new HtmlGenerate();
            $html_code->type = $request->template_type;
            $html_code->company_id = $user->company_id;
            $html_code->calendar_id = $request->calendar_id;
        }
        $html_code->html_code = htmlentities($request->html_code);
        $html_code->html_json = json_encode($request->html_json);
        $html_code->save();

        return response()->json(['result' =>'success', 'code'=> $html_code], 200);
    }

    public function getHtmlGenerate(Request $request){
        $user = $request->user();
        $html_code = HtmlGenerate::where('company_id', $user->company_id)
            ->where('calendar_id', $request->calendar_id)
            ->where('type', $request->template_type)
            ->first();
        $code = empty($html_code) ? null : [
            'html_code'     => html_entity_decode($html_code->html_code),
            'html_json'     => json_decode($html_code->html_json)
        ];
        return response()->json(['result' => 'success', 'code' => $code], 200);
    }
}
