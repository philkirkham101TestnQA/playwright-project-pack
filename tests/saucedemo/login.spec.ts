import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { SauceDemoUsers } from '../utils/test-data';

test.describe('SauceDemo Login Tests', () => {
  
    test(' successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
      await expect(page.locator('.title')).toHaveText('Products');
      
    });

    test(' unsuccessful login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    const isErrorVisible  = await loginPage.isErrorVisible();
    await expect(isErrorVisible).toBeTruthy();
    const errorText = await loginPage.getErrorMessage();
    await expect(errorText).toContain('Username and password do not match any user in this service');
    });

    test( 'login fails with locked ouut user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorText = await loginPage.getErrorMessage();
    await expect(errorText).toContain('Sorry, this user has been locked out.');
    })

    test('clear error message after failed login', async ({ page }) => {    
    const loginPage = new LoginPage(page);  
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.clearError();

    await expect(loginPage.errorMessage).not.toBeVisible
    });


 
  });