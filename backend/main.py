import requests
import bs4
from bs4 import BeautifulSoup

# Parses through each faculty/Subject/Course and Time of each course 
def web_request():
    base_url = 'https://catalogue.ualberta.ca'
    web_request = requests.get(base_url)
    faculty_soup = bs4.BeautifulSoup(web_request.text, 'html.parser')
    
    with open("data.txt", "w") as file:
        for faculty in faculty_soup.find_all('tr'):
            faculty_link = base_url+ faculty.a['href']
            subject_soup = bs4.BeautifulSoup(requests.get(faculty_link).text, 'html.parser')
            faculty_name = faculty.a.string
            if ',' in faculty_name:
                faculty_name = faculty_name.replace(',','')
            else:
                faculty_name = faculty.a.string
            for subject in subject_soup.find_all('td'):
                if subject.find('a'):
                    subject_link = base_url + subject.a['href']
                    subject_link = bs4.BeautifulSoup(requests.get(subject_link).text, 'html.parser')
                    subject_name = subject.a.string.strip()
                    for course in subject_link.find_all('div', {"class": "claptrap-course-summary"}):
                        if course.find('a'):
                            course_link = base_url + course.a['href']
                            course_link = bs4.BeautifulSoup(requests.get(course_link).text, 'html.parser')
                            course_code = course.contents[1].string.strip()
                            couse_descr = course.contents[3].string
                            if ',' in couse_descr:
                                couse_descr = couse_descr.replace(',','').strip()
                            else:
                                couse_descr = course.contents[3].string.strip()
                            for course_detail in course_link.find_all('div', {"class": "claptrap-class"}):
                                if course_detail.find('h3'):
                                    course_term = course_detail.h3.string
                                if course_detail.find('em'):
                                    course_time = course_detail.em.string
                                    if course_time == 'None':
                                        course_time == 'Not Available'                     
                                output = str(faculty_name)+','+str(subject_name)+','+str(course_code)+','+str(couse_descr)+','+str(course_term).strip()+','+str(course_time)+'\n'
                                file.write(output)


        
if __name__ == "__main__":
    web_request()

