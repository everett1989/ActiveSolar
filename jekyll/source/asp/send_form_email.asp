<%
Dim email_to, email_subject, host, username, password, reply_to, port, from_address
Dim first_name, last_name, street_address, city,state, zip, email_from, telephone, select_residential, select_commercial, select_electric, select_hotwater, comments, error_message
Dim ObjSendMail, email_message

email_to = "extremezoo@gmail.com"  'Enter the email you want to send the form to
email_subject = "New Active Solar Customer"  'You can put whatever subject here
host = "mail21.safesecureweb.com"   'The mail server name. (Commonly mail.yourdomain.xyz if your mail is hosted with HostMySite) 
username = "extremezoo@activesolarusa.com"  'A valid email address you have setup 
from_address = "extremezoo@activesolarusa.com" 'If your mail is hosted with HostMySite this has to match the email address above 
password = "Today@123"  'Password for the above email address
reply_to = "extremezoo@gmail.com"  'Enter the email you want customers to reply to
port = "25" 'This is the default port. Try port 50 if this port gives you issues and your mail is hosted with HostMySite
  
Sub Died(errors)
    'Your error code can go here 
    Response.write("We are very sorry, but there were error(s) found with the form you submitted. These errors appear below.<br /><br />")
    Response.write(errors & "<br /><br />")
    Response.write("Please go back and fix these errors.<br /><br />")
    Response.End 
End Sub

'Validate expected data exists
If Request.Form("first-name-field") = "" Or Request.Form("last-name-field") = ""  Or Request.Form("email-field") = "" Or Request.Form("street-address-field") = "" Or Request.Form("city-field") = "" Or Request.Form("state-field") = "" Or Request.Form("zip-field") = "" Or Request.Form("phone-field") = "" Then
    Call Died("Required field/s have not been entered")
End If

first_name = Request.Form("first-name-field")  'required 
last_name = Request.Form("last-name-field")  'required 
street_address = Request.Form("street-address-field")  'required
city = Request.Form("city-field")  'required
state = Request.Form("state-field")  'required
zip = Request.Form("zip-field")  'required
email_from = Request.Form("email-field")  'required 
telephone = Request.Form("phone-field")  'required
contact_time = Request.Form("contact-time-field")  'unrequired
bill = Request.Form("bill-field")  'unrequired

select_residential = Request.Form("select-residential-field")  'unrequired
select_commercial = Request.Form("select-commercial-field")  'unrequired
select_electric = Request.Form("select-electric-field")  'unrequired
select_hotwater = Request.Form("select-hotwater-field")  'unrequired

comments = Request.Form("comments-field")  'unrequired 

Dim rg
Set rg = New RegExp
rg.Global = True

rg.Pattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$"
If Not rg.Test(Request.Form("email-field")) Then 
    error_message = error_message & "The Email Address you entered does not appear to be valid.<br />"
End If

rg.Pattern = "^[A-Za-z .'-]+$"
If Not rg.Test(Request.Form("first-name-field")) Then 
    error_message = error_message & "The First Name you entered does not appear to be valid.<br />"
End If

If Not rg.Test(Request.Form("last-name-field")) Then 
    error_message = error_message & "The Last Name you entered does not appear to be valid.<br />"
End If

If Not error_message = "" Then
    Call Died(error_message)
End If

Function CleanString(str)
    Dim bad(5)
    bad(0) = "content-type"
    bad(1) = "bcc:"
    bad(2) = "to:"
    bad(3) = "cc:"
    bad(4) = "href"
    For Each Item in bad
        str = Replace(str, Item, "")
    Next
    CleanString = str
End Function

email_message = "Form details below.<br /><br />"
email_message = email_message & "First Name: " & CleanString(first_name) & "<br />"
email_message = email_message & "Last Name: " & CleanString(last_name) & "<br />"
email_message = email_message & "Street Address: " & CleanString(street_address) & ", " 
email_message = email_message & CleanString(city) & ", "
email_message = email_message & CleanString(state) & ", "
email_message = email_message & CleanString(zip) & "<br />"

email_message = email_message & "Email: " & CleanString(email_from) & "<br />"
email_message = email_message & "Telephone: " & CleanString(telephone) & "<br />"
email_message = email_message & "Best Contact Time: " & CleanString(contact_time) & "<br />"
email_message = email_message & "Monthly Bill: " & CleanString(bill) & "<br />"
email_message = email_message & "Email: " & CleanString(email_from) & "<br />"

email_message = email_message & "Residential: " & CleanString(select_residential) & "<br />"
email_message = email_message & "Commercial: " & CleanString(select_commercial) & "<br />"

email_message = email_message & "Solar Electric: " & CleanString(select_electric) & "<br />"
email_message = email_message & "Solar Hot Water: " & CleanString(select_hotwater) & "<br />"

email_message = email_message & "Comments: " & CleanString(comments) & "<br />"


Set ObjSendMail = CreateObject("CDO.Message")
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpserver") = host
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = port
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = False
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 60
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/sendusername") = username
ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/sendpassword") = password
ObjSendMail.Configuration.Fields.Update

ObjSendMail.To = email_to
ObjSendMail.Subject = email_subject
ObjSendMail.From = from_address

ObjSendMail.HTMLBody = email_message

'This section sends the email
On Error Resume Next
ObjSendMail.Send

If err.number <> 0 Then
    'Include your own failure message html here
    Response.write("Unfortunately, the message could not be sent at this time. Please try again later.")
    
    'Uncomment the line below to see errors with sending the message
    Response.write("<br />Error: " & err.description)
Else
    'Include your own success message html here
    Response.write("Thank you for contacting us. We will be in touch with you very soon.")
End If

set ObjSendMail = Nothing

%>