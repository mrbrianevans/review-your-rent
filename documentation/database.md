# Database
NoSQL Database hosted by Firebase

## Data structures
### Houses
strip `.` characters due to firebase key restrictions
* street address (primary key)
    * place_id
    * primary_address
    * secondary_address
    * distance_from_uni
    * terms
        * street_number
        * street
        * town
        * city
        * post_code
        * county
        * region
        * country
### Reviews
* street address (foreign key)
    * student id (foreign key)
        * title
        * date
        * body
        * reviewer (display name)

### Students
* student_id (primary key, auto_generate)
    * full_name
    * email_address
    * date_joined
    * reviews
        * 
