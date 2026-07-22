# NEC Staff Hub: Client Workflow Demo

⚠️ Important Deployment Note

The backend for this application is deployed on a free-tier service using Render. Due to limitations of the free tier:

Email services (including OTP delivery) are not supported
OTPs will be displayed directly in the app via toast notifications instead of being sent via email
All other email-based functionalities are disabled or blocked by the server

This behavior is only for demo/testing purposes and does not reflect production functionality.

## 1. Purpose

This document explains how to access the NEC Staff Hub mobile application and how each role uses the app during a workflow demo.

The application supports four primary roles:

- Staff
- HOD
- HR
- OA

The platform is designed to support day-to-day academic staff operations such as attendance posting, leave request submission, leave review, OA attendance processing, notifications, and profile management.

## 2. Demo Access Accounts

Use the following accounts for workflow demonstration:

| Role  | Demo Email          |
| ----- | ------------------- |
| Staff | `staff@mailsac.com` |
| HR    | `hr@mailsac.com`    |
| OA    | `oa@mailsac.com`    |
| HOD   | `hod@mailsac.com`   |

## 3. Login and Access Flow

### 3.1 Authentication options

The application supports:

- Email + OTP login
- Google Sign-In, where enabled

### 3.2 Email + OTP flow

1. Open the app landing screen.
2. Enter the email address for the required role.
3. Request OTP.
4. Enter the OTP on the verification screen.
5. After successful verification, the user is routed into the application with the correct role-based navigation.

### 3.3 Role-based experience

After login, the user sees only the tabs and flows relevant to that role. The bottom navigation changes automatically based on the logged-in account.

## 4. Role-wise Tab Access

### 4.1 Staff tabs

- Home
- Leaves
- Profile

### 4.2 HOD tabs

- Home
- Leaves
- Leave Requests
- Profile

### 4.3 HR tabs

- Home
- Profile

### 4.4 OA tabs

- OA Home
- OA Filter
- Profile

## 5. Common Features Across Roles

### 5.1 Notifications

The application includes an in-app notification center.

Features:

- Bell icon on supported screens
- Red dot shown only when unread notifications are available
- Notification list with `All` and `Unread` filters
- Tap a notification to open the full message in a modal
- Opening a notification marks it as read

### 5.2 Push notifications

Push notifications are controlled from the Profile screen.

Behavior:

- If the `Notifications` switch is enabled, the user receives push notifications
- If the switch is disabled, push delivery is stopped for that user device

### 5.3 Profile

Each role can access a profile area to:

- View personal details
- Manage notification preference
- Log out of the application

## 6. Staff Workflow

### 6.1 Staff Home

The Staff Home screen shows the timetable or schedule for the selected day.

Capabilities:

- View daily teaching schedule
- Change date to inspect a different day
- Open the notification screen
- Select a schedule item to open attendance entry

### 6.2 Attendance Posting

When a staff member opens a schedule item, the Attendance screen is loaded for that batch, period, and date.

Capabilities:

- View attendance statistics summary
- Search students by name or roll number
- Mark individual students as Present, Absent, or OD
- Use quick actions such as `Mark All Present` and `Mark All Absent`
- Save attendance for the selected period and date

Rules:

- Attendance cannot be saved for a future date
- Existing attendance can be updated again if required

### 6.3 Leave Management

The Staff user can open the `Leaves` tab to manage leave activity.

Capabilities:

- View leave requests by status
- Open leave details
- Cancel an eligible leave request
- Create a new leave request

### 6.4 Leave Request Submission

The `New Leave Request` flow supports:

- Leave type selection
- Leave category selection
- Start date and end date
- Reason entry
- Supporting document upload

Supported documents:

- PDF
- JPEG
- JPG
- PNG

Validation:

- Maximum size per file: 20 MB

Additional behavior:

- Uploaded files can be previewed in-app
- PDF files are opened in a PDF preview modal
- Image files are previewed in-app
- If leave balance is insufficient, the system can show a warning and ask for confirmation before submission

### 6.5 Staff notifications

Staff users receive notifications when:

- Their leave request is approved by HR
- Their leave request is rejected by HR

## 7. HOD Workflow

The HOD role inherits the standard Staff experience and additionally receives leave intimations.

### 7.1 HOD Home

HOD can access the normal Home timetable and attendance flow, similar to Staff.

### 7.2 HOD Leaves

HOD can view personal leave records in the `Leaves` tab.

### 7.3 HOD Leave Requests tab

The `Leave Requests` tab is specifically for viewing leave requests that must be intimated to the corresponding HOD.

Capabilities:

- View incoming leave intimations
- Filter by status
- Open leave details
- Review supporting documents in preview mode

Important note:

- In this workflow, the HOD is informed of the leave request
- Final approval or rejection is handled by HR

### 7.4 HOD notifications

HOD users receive notifications when:

- A new leave request is created in their department and must be intimated to them

## 8. HR Workflow

The HR role is focused on leave approval operations.

### 8.1 HR Home

The HR Home is the Leave Approval dashboard.

Capabilities:

- View leave approval queue
- Filter requests by status
- Open request details
- Review leave reason and documents
- Approve or reject leave requests
- Add review remarks where applicable

### 8.2 Leave Approval Details

From the leave approval detail screen, HR can:

- Review request details
- Inspect submitted documents
- Approve a request
- Reject a request

After review:

- The requesting staff member receives a notification about the decision
- The list refreshes automatically

### 8.3 HR notifications

HR users receive notifications when:

- A new leave request is submitted and requires HR review

## 9. OA Workflow

The OA role has two primary operational tabs: `OA Home` and `OA Filter`.

### 9.1 OA Home

This screen is used for creating and updating OA attendance.

Capabilities:

- Select department
- Select year
- Choose attendance mode:
  - Day
  - Range
  - Period
- Select period where applicable
- Select start date and end date
- Filter by status
- Search students
- View summary cards for:
  - Total Students
  - Present
  - Absent
  - OD
- Update individual or bulk student statuses
- Save attendance

Important behavior:

- OA attendance can be updated multiple times
- The screen refreshes data from backend when revisited
- Absent students can trigger tutor notifications

### 9.2 OA Filter

This screen is used for attendance review and reporting.

Capabilities:

- Filter by department and year
- Filter by day or date range
- Search student records
- Filter by attendance status
- View attendance summary cards
- View paginated student results
- Export attendance report

### 9.3 OA notifications

OA users can access the in-app notification center from the OA screens when available through the header flow.

## 10. Notification Workflows

The notification system supports both in-app notifications and push notifications, subject to the user’s notification preference.

### 10.1 Attendance-related notifications

- When attendance is created and students are marked absent, the tutor of the absent student can receive a notification
- When OA attendance is saved and a student is absent, the tutor of that student can receive a notification

### 10.2 Daily reminder notifications

- Every day at 5:00 PM IST, the system checks whether attendance has been missed
- If a staff member has not posted attendance where expected, a notification can be generated as a reminder

### 10.3 Leave-related notifications

- New leave request created:
  - HR is notified
  - The corresponding HOD is intimated
- Leave approved:
  - Staff is notified
- Leave rejected:
  - Staff is notified

## 11. Recommended Demo Script for Client Presentation

### 11.1 Staff demo

1. Log in using `staff@mailsac.com`
2. Open Home and show the daily timetable
3. Open one class and demonstrate attendance marking
4. Save attendance
5. Open Leaves
6. Create a leave request with a sample attachment
7. Preview the attachment inside the app
8. Submit the leave request
9. Open Notifications and show any role-relevant alerts
10. Open Profile and show the notification toggle

### 11.2 HOD demo

1. Log in using `hod@mailsac.com`
2. Open Leave Requests
3. Show departmental leave intimations
4. Open a leave request
5. Preview attached document
6. Show how HOD stays informed through notifications

### 11.3 HR demo

1. Log in using `hr@mailsac.com`
2. Open the approval queue on Home
3. Filter by status if required
4. Open a leave request
5. Review the reason and documents
6. Approve or reject the request
7. Explain that the staff member receives a notification after the decision

### 11.4 OA demo

1. Log in using `oa@mailsac.com`
2. Open OA Home
3. Choose department, year, date mode, and filters
4. Update attendance statuses
5. Save OA attendance
6. Re-open or refresh and show that repeated updates are supported
7. Open OA Filter
8. Show statistics, pagination, and report filtering
9. Export or review the attendance report

## 12. Business Value Summary

The application centralizes several manual academic workflows into one mobile experience:

- Attendance capture for teaching staff
- Attendance control and reporting for OA
- Leave submission for staff
- Leave visibility for HOD
- Leave approval for HR
- Real-time notifications for operational follow-up
- In-app document preview for faster review

## 13. Conclusion

NEC Staff Hub provides a role-based workflow model where each user sees only the tools relevant to their responsibilities. This makes the application suitable for operational demos because the full institutional workflow can be demonstrated using the four demo roles provided above.
