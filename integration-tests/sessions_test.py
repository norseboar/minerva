import unittest

from selenium import webdriver

LOCAL_HOST = 'http://localhost:3000/'


class SignupTest(unittest.TestCase):
    def test_signup(self):
        driver = webdriver.Chrome()
        driver.get(LOCAL_HOST)

        self.assertEqual(driver.title, "Kvasir Movies")
        driver.find_element_by_class_name("signup").click()

        email_input = driver.find_element_by_name('email')
        email_input.clear()
        email_input.send_keys('naomi@jacobs.com')
        password_input = driver.find_element_by_name('password')
        password_input.clear()
        password_input.send_keys('super secret')
        driver.close()


if __name__ == '__main__':
    unittest.main()