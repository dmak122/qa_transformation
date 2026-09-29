import { BasePage } from './basepage';

export class WidgetsPage extends BasePage {
  
  async openWidget(widgetName: string) {
    await this.navigateToSubMenu('Widgets', widgetName);
  }
  
}