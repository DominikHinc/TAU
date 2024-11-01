from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://pl.quora.com/"
browsers = {
    "Chrome": webdriver.Chrome,
    "Edge": webdriver.Edge,
    "Firefox": webdriver.Firefox
}

def checkPrivacyNavigation(browser_name, driver):
    driver.get(url)

    privacyAcceptButton =  WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "onetrust-accept-btn-handler")))
    assert privacyAcceptButton.is_displayed(), f"{browser_name}: Privacy accept button is not visible"
    privacyAcceptButton.click()

    privacyButton = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.LINK_TEXT, "Prywatność")))
    assert privacyButton.is_displayed(), f"{browser_name}: Privacy button is not visible"
    privacyButton.click()

    assert "/about/privacy" in driver.current_url, f"{browser_name}: Did not navigate to /about/privacy"
    privacyTitle = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Polityka prywatności')]")))
    assert privacyTitle.is_displayed(), f"{browser_name}: Privacy policy title is not visible"

    privacyImage = driver.find_element(By.CSS_SELECTOR, "img[src='https://qph.cf2.quoracdn.net/main-qimg-0fae83e9b276c23c934106adc980169f']")
    assert privacyImage.is_displayed(), f"{browser_name}: Privacy policy image is not visible"

    tosLink = driver.find_element(By.LINK_TEXT, "Warunki świadczenia usług")
    assert tosLink.is_displayed(), f"{browser_name}: Terms of Service link is not visible"
    tosLink.click()

    assert "/about/tos" in driver.current_url, f"{browser_name}: Did not navigate to /about/tos"
    tosTitle = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Zasady użytkowania serwisu')]")))
    assert tosTitle.is_displayed(), f"{browser_name}: Terms of Service title is not visible"

    communityGuidelinesLink = driver.find_element(By.LINK_TEXT, "Regulamin społeczności")
    assert communityGuidelinesLink.is_displayed(), f"{browser_name}: Community Guidelines link is not visible"
    communityGuidelinesLink.click()

    assert "/about/acceptable_use" in driver.current_url, f"{browser_name}: Did not navigate to /about/acceptable_use"
    communityGuidelinesTitle = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Quora jest miejscem, które pozwala ludziom dzielić się wiedzą i wzbogacać świat. Zadaniem poniższych polityk jest zapewnienie wszystkim użytkownikom Quora bezpiecznego korzystania z serwisu:')]")))
    assert communityGuidelinesTitle.is_displayed(), f"{browser_name}: Community Guidelines title is not visible"

    grievanceLink = driver.find_element(By.LINK_TEXT, "Skarga (Indie)")
    assert grievanceLink.is_displayed(), f"{browser_name}: Grievance (India) link is not visible"
    grievanceLink.click()

    assert "/about/grievance" in driver.current_url, f"{browser_name}: Did not navigate to /about/grievance"
    grievanceTitle = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[contains(text(), 'Grievance Officer contact information for users in India')]")))
    assert grievanceTitle.is_displayed(), f"{browser_name}: Grievance Officer title is not visible"

    driver.quit()

for browserName, browserDriver in browsers.items():
    driver = browserDriver()
    checkPrivacyNavigation(browserName, driver)
