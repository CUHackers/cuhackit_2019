from selenium import webdriver
from sys import argv, exit
from time import sleep
import os

currentDirectory=os.path.dirname(os.path.realpath(__file__))


if len(argv) < 2:
    exit('what are your files you want me to watch? '+
         '(starting with the one you want me to display)')

location = "file://"+os.path.realpath(argv[1])

print(location)

driver = webdriver.Chrome(currentDirectory+"/chromedriver")



fileHistory = {}
while True:
    changed = False
    for i, filename in enumerate(argv[1:]):
        state = open(filename).read()
        if not i in fileHistory or state != fileHistory[i]:
            fileHistory[i] = state
            changed = True

    if changed:
        driver.get(location)
        print("reloading...")

    sleep(.1 * len(argv))
