import { InjectionToken } from '@angular/core';
import { Response } from 'express';
export const RESPONSE = new InjectionToken<Response>('response that will be sended by the server');