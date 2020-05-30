import mysql.connector
from db_credentials import *
import sys
import os

def initialize(cr):
    db = scoped_credentials()
    cr = db.cursor()

    cr.execute('''CREATE TABLE uAlberta_Courses (
                Faculty_id VARCHAR(255),
                Dept_id VARCHAR(255),
                Course_code VARCHAR(255),
                Course_name VARCHAR(255),
                Course_term VARCHAR(255),
                Course_type VARCHAR(255),
                Course_day VARCHAR(255),
                Course_start VARCHAR(255),
                Course_end VARCHAR(255))''')
    cr = db.cursor()


    with open("data.txt", "r") as file:
        for each_line in file:
            data = each_line.split(",")
            sql_output = "INSERT INTO uAlberta_Courses (Faculty_id,Dept_id,Course_code,Course_name,Course_term,Course_type,Course_day,Course_start,Course_end) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            data_time = data[5]
            data_time = data_time.split()
            course_desc = data[4]
            course_desc = course_desc.rsplit()
            try:
                inputed_data = data[0],data[1],data[2],data[3],course_desc[0] + " " + course_desc[1] + " " + course_desc[2],course_desc[4] + " " + course_desc[5] ,data_time[0],data_time[1],data_time[3]
            except IndexError:
                if course_desc[0] == str('None'):
                    inputed_data = data[0],data[1],data[2],data[3],invalid,invalid,invalid,invalid,invalid
                else:
                    invalid = 'None'
                    inputed_data = data[0],data[1],data[2],data[3],course_desc[0] + " " + course_desc[1] + " " + course_desc[2],course_desc[4] + " " + course_desc[5],invalid,invalid,invalid

            cr.execute(sql_output,inputed_data)
    
    path = "frontend/src/data/"
    text_file = path + "course.txt"
    sql_query1 = ''' SELECT DISTINCT Dept_id
                    FROM uAlberta_Courses
                    union
                    Select Distinct Course_code
                    From uAlberta_Courses
                    ORDER BY Dept_id'''
    cr.execute(sql_query1)
    data = [data[0] for data in cr.fetchall()] 

    with open(text_file, "w") as file:
        file.write(str(data))

    file.close()
            # print("test")
            # for each_desc in data:
            #     file.write(str(data)
    # file.close()

    db.commit()




def main():
    #Connecting to Database
    db = credentials()
    cr = db.cursor()

    cr.execute("SHOW DATABASES")
    for each_element in cr:
        if each_element[0] == 'uAlberta_db':
            #DROP uAlberta_db DATABASES
            cr.execute("DROP DATABASE uAlberta_db")
        else:
            continue
    #Create NEW DATABSE
    cr.execute("CREATE DATABASE uAlberta_db")
    db.commit

    initialize(cr)

if __name__ == "__main__":
    main()
