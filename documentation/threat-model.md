# Threat model
This document is to identity, describe and prioritise risks associated with this system

## Identified risks
Threats can be classified into the STRIDE framework published by Microsoft
### Spoofing identity
The risk is that a user may spoof the identity of another user to gain access to their account. 
The potential impact of this would be that they are able to see the spoofed accounts personal details including email address and name, as well as past addresses if the spoofed account has written reviews.
The likelihood of this taking place is low, due to the low reward for an actor who succeeds at spoofing an account.
To mitigate against this risk, a user will be required to click on a link sent to them by email before gaining access to the account.

**Likelihood**: Low

**Impact**: Low

**Mitigation**: email authentication

### Tampering with data
The risk is that a malicous actor attempts to alter review data. This could be an estate agent modifying a negative review to change it to a positive review.
The potential impact of this would be a loss of trust of the user base, and a decrease in the utility of the website if the reviews are not reliably authentic.
The likelihood of this happening is medium, due to the potential reward if done successfully.
To mitigate this risk, the database has an access rule, stipulating that to change a review record, a user must be authenticated as the author of the review, requiring them to click a link sent to them by email. This action can only be performed by the email account holder, making it very difficult to breach for a malicous party.

**Likelihood**: Medium

**Impact**: Medium

**Mitigation**: database access rules

### Repudiation
The risk is that a user would deny writing an review of a house. 
The potential impact of this is negligable, as the review can be deleted by the user.
The likelihood of this happening is very low, as there is no potential gain for the user.
This is an accepted risk.

**Likelihood**: Medium

**Impact**: Medium

**Mitigation**: database access rules

### Information disclosure
The risk is that users' personal data stored in the database is exposed publicly or to a third party. This data includes email address, name and previous residential addresses (optional).
The potential impact of this is high, because it would be damaging to the users as their email addresses would be made public, opening them up to spam and scams. This would lead to erosion of user trust. This would also be a breach of GDPR and could result in a fine.
The likelihood of this happening is medium, because there is potentially a high reward for an attacker able to obtain an entire set of user email addresses.
To mitigate this risk, secure database rules are implemented, that require authentication to access individual account details.

**Likelihood**: Medium

**Impact**: High

**Mitigation**: database access rules

### Denial of service
The risk is that a malicous actor overloads the server, and the server denies access to regular users. Preventing them from writing new reviews, or reading reviews.
The potential impact of this is low if it is short lived (<24 hours) because reviews are not time sensitive. However, if it lasted a long period of time (days or weeks), it would harm business as the site would gain a bad reputation for being unreliable.
The likelihood of this happening is very low, due to the lack of reward for a successful attacker, and the low profile of the website.
To mitigate this risk, each user is only able to submit one review per year. This extreme rate limiting, will prevent a user from overloading the server by submitting a lot of reviews.


**Likelihood**: Very low

**Impact**: Low or Medium

**Mitigation**: rate limiting

### Elevated privileges
The risk is that a normal user gained admin privileges, allowing them to access and modify other users data, as well as persistant data such as the list of houses.
The potential impact of this is very high, as it could bring down the system completely (by deleting all data). 
The likelihood of this happening is low, as there is no reward to a successful attacker.
To mitigate this risk, there are strict controls in place to ensure only true admins have admin privileges to the database


**Likelihood**: Low

**Impact**: Very high

**Mitigation**: strict database access rules



