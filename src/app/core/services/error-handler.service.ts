import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class ErrorHandlerService {
  private toastr = inject(ToastrService);

  handleClientError(error: unknown): void {
    const errorMessage = this.extractClientErrorMessage(error);
    this.toastr.error(errorMessage, 'Client Error');
    console.error('Client-side Error:', error);
  }

  handleHttpError(status: number, error: any): void {
    const errorMessage = this.extractHttpErrorMessage(status, error);
    this.toastr.error(errorMessage, 'Error');
    console.error(`HTTP ${status} Error:`, error);
  }

  private extractClientErrorMessage(error: unknown): string {
    if (error instanceof ErrorEvent) {
      return `A client-side error occurred: ${error.message}`;
    }
    if (error instanceof Error) {
      return `An error occurred: ${error.message}`;
    }
    return 'An unexpected error occurred. Please try again.';
  }

  private extractHttpErrorMessage(status: number, error: any): string {
    switch (status) {
      case 400:
        return error?.message ? `Bad request: ${error.message}` : 'Bad request.';
      case 401:
        return 'Unauthorized access.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Internal server error.';
      default:
        return `Unexpected error: ${error?.statusText || 'Unknown status'}`;
    }
  }
}
