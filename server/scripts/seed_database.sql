INSERT INTO clients (
    date_added,
    name,
    phone_number,
    bikes_needed,
    booking_status,
    residency_status,
    country_of_origin, 
    time_in_scotland,
    language_spoken,
    english_speaker,
    english_skill_level,
    gender,
    date_of_birth,
    postcode,
    referring_agency,
    pick_up_date
    )
VALUES 
    ( '2021-07-15 04:33:57', 'Ahmad J', '+447700900745', 9, 5, 1, 'Afghanistan', '2 weeks', 'Dari', true, 'Learning', 'male', '04/12/1990', 'IV40 8AW', 'New Start Highland', '2022-02-22 09:30:00'),
    ('2021-02-19 14:14:02', 'Shana A', '+447700900864', 7, 2, 4, 'Iran', 'since October 2021', 'Farsi', true, 'Fluent', 'female', '12/08/1975', 'G20 1AX', 'New Start Highland', '2022-02-22 10:00:00'),
    ( '2021-10-09 13:37:44', 'Hedi M', '+447700900207', 1, 5, 1, 'Iran', 'one month', 'Kurdish Sorani', true, 'A little', 'prefer not to say', '07/03/1981', 'EH8 3AW', 'Link Living', null),
    ( '2021-12-16 05:02:22', 'Mohamad', '+447700900873', 2, 5, 1, 'Syria', 'eight weeks', 'Arabic', false, 'None', 'male', '06/04/2000', 'G3 9GW', 'Link Living', '2022-02-25 10:30:00'),
    ( '2021-07-27 14:09:44', 'Masoud A', '+447700900883', 2, 4, 4, 'Afghanistan', '2 weeks', 'Dari', true, 'A little', 'male', '01/10/2001', 'G5 9AB', 'Homeless Families Health and Care Team', null)
    ;