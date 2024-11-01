from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://www.lidl.pl/"
browsers = {
    "Chrome": webdriver.Chrome,
    "Edge": webdriver.Edge,
    "Firefox": webdriver.Firefox
}
def get_shadow_root(element):
    return driver.execute_script('return arguments[0].shadowRoot', element)

def checkLidlShopping(browser_name, driver):
    driver.get(url)

    privacyAcceptButton =  WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "onetrust-accept-btn-handler")))
    assert privacyAcceptButton.is_displayed(), f"{browser_name}: Privacy accept button is not visible"
    privacyAcceptButton.click()

    titleElement = driver.find_element(By.CLASS_NAME, "AStartPageTemplate__ActivationText")

    assert titleElement.is_displayed(), f"{browser_name}: 'Zakupy robię w Lidlu!' is not visible"
    
    if(browser_name == "Firefox"):
        # Firefox has issues with shadow roots
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.TAG_NAME, "leaflets-banner")))
        leafletButton = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[aria-label="Nasze gazetki"]')))
        assert leafletButton.is_displayed(), f"{browser_name}: Leaflet overview button is not visible"
        driver.execute_script("arguments[0].click()", leafletButton);
        # leafletButton.click()
        pass
    else:
        leafletButton = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.TAG_NAME, "leaflets-banner")))
        assert leafletButton.is_displayed(), f"{browser_name}: Leaflet overview button is not visible"
        driver.implicitly_wait(2)
        leafletButton.click()

    assert WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "leaflets-overview__headline"))), f"{browser_name}: 'Nasze gazetki' is not visible"
    
    flyerElement = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "flyer")))
    assert flyerElement.is_displayed(), f"{browser_name}: Flyer element is not visible"
    flyerElement.click()

    assert WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@alt='Strona 1']"))), f"{browser_name}: 'Strona 1' is not visible"
    
    nextPageButton = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@aria-label='Następna strona']")))
    assert nextPageButton.is_displayed(), f"{browser_name}: Next page button is not visible"
    nextPageButton.click()

    assert WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@alt='Strona 2']"))), f"{browser_name}: 'Strona 2' is not visible"
    
    previousPageButton = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@aria-label='Poprzednia strona']")))
    assert previousPageButton.is_displayed(), f"{browser_name}: Previous page button is not visible"
    previousPageButton.click()

    assert WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@alt='Strona 1']"))), f"{browser_name}: 'Strona 1' is not visible"
    assert WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, "//*[@aria-label='Następna strona']"))), f"{browser_name}: Next page button is not visible"

    driver.quit()

for browserName, browserDriver in browsers.items():
    driver = browserDriver()
    checkLidlShopping(browserName, driver)