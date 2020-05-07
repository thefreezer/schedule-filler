import requests
from bs4 import BeautifulSoup

URL = "https://catalogue.ualberta.ca"

m_soup = BeautifulSoup(requests.get(URL).content, 'html.parser')

with open("data.csv", "w") as file:
    for faculty in m_soup.find_all('tr'):
        f_URL = URL+faculty.a['href']
        f_soup = BeautifulSoup(requests.get(f_URL).content, 'html.parser')
        for subject in f_soup.find_all('td'):
            if subject.find('a'):
                s_URL = URL+subject.a['href']
                s_soup = BeautifulSoup(requests.get(s_URL).content, 'html.parser')
                for course in s_soup.find_all('div', {"class": "claptrap-course-summary"}):
                    out = str(faculty.a.string)+","+str(subject.a.string)+","+str(course.contents[1].string).strip()+","+str(course.contents[3].string).strip()+"\n"
                    file.write(out)

