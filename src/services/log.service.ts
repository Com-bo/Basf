export default class LogService {
  logMessage = (content: any) => {
    console.log('content:', content);
  };

  logError = (error: any) => {
    console.log('error:', error);
  };
}
