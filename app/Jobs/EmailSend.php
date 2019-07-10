<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Carbon\Carbon;
class EmailSend implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user, $subject, $message;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $subject, $message)
    {
        $this->user = $user;
        $this->subject = $subject;
        $this->message = $message;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $data_to_send = new \stdClass();
        $output = new \stdClass();
        $basic_token      = "v_id_token";
        $encryption_token = "v_pw_token";


        $encryption_iv    = "1298984747587839";
        $encryption  = "aes-256-cbc";

        if($this->user->company->smtp_server == '') {
            $smtp_server = config('smtp.server');
        }else {
            $smtp_server = decrypt($this->user->company->smtp_server);
        }

        if($this->user->company->smtp_user == '') {
            $smtp_user = config('smtp.user');
        }else {
            $smtp_user = decrypt($this->user->company->smtp_user);
        }

        if($this->user->company->smtp_password == '') {
            $smtp_password = config('smtp.password');
        }else {
            $smtp_password = decrypt($this->user->company->smtp_password);
        }


        if($this->user->company->smtp_from_email == '') {
            $smtp_from_email = config('smtp.from_email');
        }else {
            $smtp_from_email = decrypt($this->user->company->smtp_from_email);
        }


        $data_to_send->auth_token = $basic_token;
        $data_to_send->data = array(
            "company_id"  => $this->user->company_id,
            "location_id" => 1,
            "type"        => "smtp",
            "universal"   => "",
            "Smtp_data"   => array(
                "server"    => $smtp_server, //smtp server adress
                "auth_tls"  => true, // tls or not (true/false)
                "user"      => $smtp_user, //login
                "password"  => $smtp_password), //password
            "mail_send"    => array(
                "date"      => Carbon::now()->toDateString(),//"date (yyyy-mm-dd)",
                "time"      => Carbon::now()->toTimeString()),//"time (HH:MM:SS)"),
            "email_data" => array(
                "from_mail"   =>   $smtp_from_email, //email
                "from_name"   =>   decrypt($this->user->company->name), //email
                "to_mail"     =>   $this->user->email, //email
                "cc_mail"     =>   decrypt($this->user->company->email),
                "bcc_mail"    =>   "",
                "subject"     =>  $this->subject,
                "text"        =>  $this->message,
                "attatchments"=>   ""));

        $output->auth_token = $data_to_send->auth_token;
        $output->data = $this->json_and_encrypt($data_to_send->data, $encryption_token, $encryption, $encryption_iv);
        $url = 'http://54.93.64.158:8081/save/mail';
        $data = json_encode($output);

        $options = array(
            'http' => array(
                'header'=>  "Content-Type: application/json\r\n" .
                    "Accept: application/json\r\n",
                'method'  => 'POST',
                'content' => $data,
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $result = json_decode($result);
        $this->json_and_decrypt($result->data, $encryption_token, $encryption, $encryption_iv);

    }
    function json_and_encrypt($data, $token, $methode, $iv){
        return openssl_encrypt(json_encode($data), 'AES-256-CBC', $token, null, $iv);
    }

    function json_and_decrypt($data, $token, $methode, $iv){
        return openssl_decrypt($data, 'AES-256-CBC', $token, null, $iv);
    }
}
