import { FestivalsPage } from './app.po';

describe('festivals App', () => {
  let page: FestivalsPage;

  beforeEach(() => {
    page = new FestivalsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
