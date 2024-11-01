from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://stackoverflow.com/"
browsers = {
    "Chrome": webdriver.Chrome,
    "Edge": webdriver.Edge,
    "Firefox": webdriver.Firefox
}

def checkStackOverflowLogin(browser_name, driver):
    driver.get(url)

    privacyAcceptButton = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//button[contains(text(), 'Accept all cookies')]")))
    assert privacyAcceptButton.is_displayed(), f"{browser_name}: Privacy accept button is not visible"
    privacyAcceptButton.click()

    dynamicTextElement = driver.find_element(By.CSS_SELECTOR, '[data-words="developer, data scientist, system admin, mobile developer, game developer"]')
    assert dynamicTextElement.is_displayed(), f"{browser_name}: Dynamic text 'developer' is not visible"

    searchBox = driver.find_element(By.NAME, "q")
    assert searchBox.is_displayed(), f"{browser_name}: Search box is not visible"

    loginButton = driver.find_element(By.LINK_TEXT, "Log in")
    assert loginButton.is_displayed() and loginButton.is_enabled(), f"{browser_name}: 'Log in' button is not visible or clickable"
    loginButton.click()

    loginDialog = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "signup-modal-container")))
    assert loginDialog.is_displayed(), f"{browser_name}: Login dialog is not visible"

    emailField = driver.find_element(By.ID, "email")
    assert emailField.is_displayed(), f"{browser_name}: Email field is not visible"
    emailField.send_keys("asd")

    passwordField = driver.find_element(By.ID, "password")
    assert passwordField.is_displayed(), f"{browser_name}: Password field is not visible"
    assert passwordField.get_attribute("type") == "password", f"{browser_name}: Password field is not of type 'password'"
    passwordField.send_keys("asd")

    formLoginButton = driver.find_element(By.ID, "submit-button")
    assert formLoginButton.is_displayed() and formLoginButton.is_enabled(), f"{browser_name}: Form 'Log in' button is not visible or clickable"
    formLoginButton.click()

    invalidEmailMessage = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'The email is not a valid email address.')]")))
    assert invalidEmailMessage.is_displayed(), f"{browser_name}: Invalid email format message is not visible"

    emailField = driver.find_element(By.ID, "email")
    passwordField = driver.find_element(By.ID, "password")
    formLoginButton = driver.find_element(By.ID, "submit-button")

    emailField.clear()
    emailField.send_keys("example@example.com")
    passwordField.clear()
    passwordField.send_keys("asd")
    formLoginButton.click()

    incorrectCredentialsMessage = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'The email or password is incorrect.')]")))
    assert incorrectCredentialsMessage.is_displayed(), f"{browser_name}: Incorrect credentials message is not visible"


    driver.quit()

# Run tests for each browser
for browserName, browserDriver in browsers.items():
    driver = browserDriver()
    checkStackOverflowLogin(browserName, driver)
