<?php
namespace App\Http\Controllers;
use Carbon\Carbon;

/**
 * Created by PhpStorm.
 * User: dev
 * Date: 11/16/18
 * Time: 8:51 AM
 */
class IcsClass
{
    /**
     * String for ics file
     */
    private  $name;
    /**
     *
     * @var string
     */
    private $timezoneICal = 'Europe/Berlin';

    /**
     *
     * @var string
     */
    private $dateStart;

    /**
     *
     * @var string
     * @abstract text title of the event
     */
    private $summary;

    /**
     *
     * @var string
     */
    private $dateEnd;

    /**
     *
     * @var string
     * @abstract the name of this file for saving (e.g. my-event-name.ics)
     */
    private $filename;

    /**
     *
     * @var string
     * @abstract the event's address
     */
    private $address;

    /**
     *
     * @var string text description of the event
     */
    private $description;

    private $calendar_id;

    /**
     * @return mixed
     */

    public function getName() {
        return $this->name;
    }

    public function getCalendarID() {
        return $this->calendar_id;
    }

    public function getTimezoneICal() {
        return $this->timezoneICal;
    }
    public function getDateStart() {
        return $this->dateStart;
    }

    public function getSummary() {
        return $this->summary;
    }

    public function getDateEnd() {
        return $this->dateEnd;
    }

    public function getFilename() {
        return $this->filename;
    }

    public function getAddress() {
        return $this->address;
    }

    public function getDescription() {
        return $this->description;
    }

    /**
     *
     * @param \DateTime $dateEventStart
     * @return \ical\ical
     */
    public function setDateEventStart(\DateTime $dateEventStart) {
        $this->dateEventStart = $dateEventStart;
    }

    /**
     *
     * @param \DateTime $dateEventEnd
     * @return \ical\ical
     */
    public function setDateEventEnd(\DateTime $dateEventEnd) {
        $this->dateEventEnd = $dateEventEnd;
    }

    /**
     *
     * @param string $name
     * @return \ical\ical
     */
    public function setName($name) {
        $this->name = $name;
    }

    /**
     *
     * @param string $timezoneICal
     * @return \ical\ical
     */
    public function setTimezoneICal($timezoneICal) {
        $this->timezoneICal = $timezoneICal;
    }

    /**
     *
     * @param \DateTime $dateStart
     * @return \ical\ical
     */
    public function setDateStart(\DateTime $dateStart) {
        $this->dateStart = $this->dateToCal($dateStart);
    }

    /**
     *
     * @param string $summary
     * @return \ical\ical
     */
    public function setSummary($summary) {
        $this->summary = $summary;
    }

    /**
     *
     * @param \DateTime $dateEnd
     * @return \ical\ical
     */
    public function setDateEnd(\DateTime $dateEnd) {
        $this->dateEnd = $this->dateToCal($dateEnd);
    }

    /**
     *
     * @param string $filename
     * @return \ical\ical
     */
    public function setFilename($filename) {
        $this->filename = $filename;
    }

    /**
     *
     * @param string $address
     * @return \ical\ical
     */
    public function setAddress($address) {
        $this->address = $address;
    }

    /**
     *
     * @param string $description
     * @return \ical\ical
     */
    public function setDescription($description) {
        $this->description = $description;
    }

    public function setCalendarID($calendar_id) {
        $this->calendar_id = $calendar_id;
    }

    /**
     * @name dateToCal()
     * @access private
     * @param \DateTime $timestamp
     * @return string
     */
    private function dateToCal(\DateTime $timestamp){
        $tz_from = 'UTC';
        $tz_to= 'Europe/Berlin';

        $dt = new \DateTime($timestamp, new \DateTimeZone($tz_from));
        $dt->setTimeZone(new \DateTimeZone($tz_to));
        return $dt->format('Ymd\THis\Z');
    }

    /**
     * @name escapeString()
     * @abstract Escapes a string of characters
     * @param string $string
     * @return string
     */
    private function escapeString($string){
        return preg_replace('/([\,;])/', '\\\$1', $string);
    }


    public function getICAL($calendar_id) {

        $calendar = \App\Calendar::where('id', $calendar_id)->first();
        $events = \App\Event::where('calendar_id', $calendar_id)->get();
        $company = $calendar->company;
        $location = $company->street. " , " . $company->city . " , " . $company->country;

        $iCal = "BEGIN:VCALENDAR" . "\r\n";
        $iCal .= 'VERSION:2.0' . "\r\n";
        $iCal .= "PRODID:" . $calendar->name . "\r\n";
        $iCal .= "METHOD:PUBLISH" . "\r\n";
        $iCal .= "CALSCALE:GREGORIAN " . "\r\n";
        $iCal .= "X-MICROSOFT-CALSCALE:GREGORIAN" . "\r\n";
        $iCal .= "X-WR-CALNAME:" . $calendar->name . "\r\n";
        $iCal .= "X-WR-CALDESC:" .$calendar->description . "\r\n";

        if(count($events) >0) {
            foreach ($events as $key => $event){
                $event_reminders = $event->reminders;

                $date_from = new Carbon($event->date_from);
                $date_to = new Carbon($event->date_to);
                $iCal .= "BEGIN:VEVENT" . "\r\n";
                $iCal .= "UID:". uniqid() . "\r\n";
                $iCal .= "DTSTART;TZID=" . $this->getTimezoneICal().":".$this->dateToCal($date_from) . "\r\n";
                $iCal .= "DTEND;TZID=" . $this->getTimezoneICal().":".$this->dateToCal($date_to) . "\r\n";
                $iCal .= "SUMMARY:" . $this->escapeString($event->summary) . "\r\n";
                $iCal .= "DESCRIPTION:" . $this->escapeString($event->description) . "\r\n";
//                $iCal .= "LOCATION:" . $this->escapeString($location). "\r\n";
//                $iCal .= "Location:Brunnengasse 4 , Kehlbach , Germany"."\r\n";
                $iCal .= "TRANSP:TRANSPARENT"."\r\n";
                $iCal .= "STATUS:CONFIRMED"."\r\n";
                if(count($event_reminders)>0){
                    foreach($event_reminders as $key_reminder => $event_reminder){
                        $iCal .= "BEGIN:VALARM". "\r\n";
                        $iCal .= "ACTION:DISPLAY". "\r\n";
                        $iCal .= "DESCRIPTION:reminder". "\r\n";
                        if($event_reminder->unit == "minutes"){
                            $iCal .= "TRIGGER:-P0DT0H".$event_reminder->time."M0S". "\r\n";
                        } else if($event_reminder->unit == "hours"){
                            $iCal .= "TRIGGER:-P0DT".$event_reminder->time."H0M0S". "\r\n";
                        } else if($event_reminder->unit == "days"){
                            $iCal .= "TRIGGER:-P".$event_reminder->time."D". "\r\n";
                        } else if($event_reminder->unit == "weeks"){
                            $iCal .= "TRIGGER:-P".($event_reminder->time * 7)."D". "\r\n";
                        }
                        $iCal .= "END:VALARM". "\r\n";
                    }
                }
                $iCal .= 'END:VEVENT' . "\r\n";
            }

        }
        $iCal .= 'END:VCALENDAR' . "\r\n";

        return $iCal;

    }

    public function addHeader() {
        header('Content-type: text/calendar; charset=utf-8');
        header('Content-Disposition: attachment; filename=' . $this->getFilename() . '.ics');
    }

}