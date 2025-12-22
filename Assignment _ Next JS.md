![][image1]

| Final  Assignment |
| :---- |

---

You have to create a web application that provides reliable and trusted care services for children, elderly, and other family members. The application allows users to find and hire caretakers for different purposes such as babysitting, elderly care, or special care at home. Users can easily book services  through the platform. The main goal of the project is to make caregiving easy, secure, and accessible for everyone.

# **Project :  Care.xyz**  

Baby Sitting & Elderly Care Service Platform  
---

Care.IO একটি ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের শিশু, বৃদ্ধ বা অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য এবং trusted care service বুক করতে সাহায্য করে।

* ব্যবহারকারী সহজেই সার্ভিস বুক করতে পারবে তার প্রয়োজনীয় সময়কাল এবং অবস্থান অনুযায়ী।  
* লক্ষ্য হচ্ছে  caregiving কে সহজ, নিরাপদ এবং অ্যাক্সেসেবল করা।

## **Key Features**

·       **Responsive Design:** Mobile, tablet, and desktop supported

·       **User Authentication:** Email & Password, Google Social Login

·       **Dynamic Booking:** Duration, Location (Division, District, City, Area), Address input

·       **Total Cost Calculation:** Automatically calculate based on duration × service charge

·       **Booking Status:** Pending / Confirmed / Completed

·       **My Booking Page:** Users can track their bookings and status

·       **Services Overview:** Baby Care, Elderly Service, Sick People Service

·       **Service Detail Pages:** Individual page for each service with details and Book Service button

---

## **Pages & Routes**

### **1\. Homepage**

·       Banner / Slider with caregiving Motivation

·       About section explaining platform mission

·       Services overview: Baby Care, Elderly Service, Sick People Service

·       Testimonials / Success metrics

### **2\. Service Detail Page (/service/:service\_id)** 

·       Show detailed information about selected service

·       **Book Service** button navigates to Booking Page / Login

### **3\. Booking Page (/booking/:service\_id) – Private Route**

Get the Data from Zapshift resources

·       Steps for booking:

1\.    Select **Duration** (days/hours)

2\.    Select **Location**: Division, District, City, Area / Address

3\.    Show **Total Cost** dynamically

4\.    Confirm Booking → Booking saved with **status \= Pending**

### **4\. Authentication**

·       **Login Page:** Email, Password 

·       **Registration Page:** NID No, Name, Email, Contact, Password, Password validation (6+ char, 1 uppercase, 1 lowercase), Redirect to Booking Page after registration

·       ⚠️ Logged-in users should not redirect to Login page on private route reload

### **5\. My Booking Page (/my-bookings) – Private Route**

·       Show all bookings with: Service Name, Duration, Location, Total Cost, Status (Pending / Confirmed / Completed / Cancelled)

·       Buttons: View Details / Cancel Booking

### **9\. Error Page (404)**

·       Show Not Found message with a button to return to Home

---

## **Challenges**

* Implement Metadata on Home &  Service details page   
* When service Booked , send user a email invoice

---

## **Optional**

* Add Stripe Payment System.  on successfully payment create Booking  
* Create Admin Dashboard , Show Payment Histories , 

## **Environment Variables**

·      config keys should be stored in environment variables

---

## **What to Submit**

·       **GitHub Repo Link:** \[Your Repo URL\]

·       **Live Link:** \[Your Live Deployment URL\]

 

