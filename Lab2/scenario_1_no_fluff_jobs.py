from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://nofluffjobs.com/pl/"
browsers = {
    "Chrome": webdriver.Chrome,
    "Edge": webdriver.Edge,
    "Firefox": webdriver.Firefox
}

def checkFluffFilters(browser_name, driver):
    driver.get(url)

    privacyAcceptButton =  WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, "onetrust-accept-btn-handler")))
    assert privacyAcceptButton.is_displayed(), f"{browser_name}: Privacy accept button is not visible"
    privacyAcceptButton.click()

    titleElement = driver.find_element(By.XPATH, "//*[contains(text(), 'Tu znajdziesz nową pracę')]")
    assert titleElement.is_displayed(), f"{browser_name}: 'Tu znajdziesz nową pracę' text is not visible"
    
    searchBox = driver.find_element(By.TAG_NAME, "nfj-search-box")
    assert searchBox.is_displayed(), f"{browser_name}: nfj-search-box component is not visible"

    filtersButton = driver.find_element(By.TAG_NAME, "nfj-filter-executor-new")
    assert filtersButton.is_displayed() and filtersButton.is_enabled(), f"{browser_name}: 'Filtry' button is not visible or clickable"
    filtersButton.click()

    dialogContainer = driver.find_element(By.TAG_NAME, "mat-dialog-container")
    assert dialogContainer.is_displayed(), f"{browser_name}: mat-dialog-container element is not visible"

    dialogCheckbox = driver.find_element(By.CSS_SELECTOR, '[formcontrolname="remote"]')
    assert dialogCheckbox.is_displayed(), f"{browser_name}: Remote work checkbox is not visible"
    assert dialogCheckbox.is_enabled(), f"{browser_name}: Remote work checkbox is not clickable"
    dialogCheckbox.click()

    dialogShowResultsButton = driver.find_element(By.XPATH, "//*[contains(text(), ' Pokaż wyniki ')]")
    assert dialogShowResultsButton.is_displayed(), f"{browser_name}: 'Pokaż Wyniki' button is not visible"
    assert dialogShowResultsButton.is_enabled(), f"{browser_name}: 'Pokaż Wyniki' button is not clickable"
    dialogShowResultsButton.click()

    sideFilterBar = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.TAG_NAME, "nfj-vertical-filters")))
    assert sideFilterBar.is_displayed(), f"{browser_name}: Side filter bar is not visible"

    remoteCheckbox = driver.find_element(By.ID, "checkbox_26")
    assert remoteCheckbox.is_selected(), f"{browser_name}: Remote work checkbox is not selected in side filter bar"

    sortingOption = driver.find_element(By.XPATH, "//*[contains(text(), 'Sortowanie')]")
    assert sortingOption.is_displayed(), f"{browser_name}: Sorting option 'Sortowanie' is not visible"

    defaultSorting = driver.find_element(By.XPATH, "//*[contains(text(), 'trafność')]")
    assert defaultSorting.is_displayed(), f"{browser_name}: Default sorting option 'trafność' is not visible"

    driver.quit()
   
    

for browserName, browserDriver in browsers.items():
    driver = browserDriver()
    checkFluffFilters(browserName, driver)
