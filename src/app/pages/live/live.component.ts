import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GPTRequest, GPTResponse } from '../../models/gptRequest';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, NgxSpinnerModule, ReactiveFormsModule],
  templateUrl: './live.component.html',
  styleUrl: './live.component.scss'
})
export class LiveComponent implements OnInit {
  recognizer!: sdk.SpeechRecognizer;
  isRecording: boolean = false;
  transcript = '';
  answer = '';

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private authService: AuthService,private router: Router) { }
  ngOnInit() {

    if (this.authService.getUserRole() != "Admin") {
      this.authService.isCardAvailable().subscribe((res) => {
        if (!res.success) {
          this.router.navigate(['subscribe']); 
        }
      });
    }
  }
  startListening() {
    if (this.isRecording) return; // Prevent duplicate instances
    this.transcript = '';
    this.answer = '';
    this.isRecording = true;

    // Initialize Speech SDK
    const speechConfig = sdk.SpeechConfig.fromSubscription(environment.speechSubscriptionKey, environment.speechRegion);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // Handle live speech recognition
    this.recognizer.recognizing = (s, e) => {
      console.log(`Recognizing: ${e.result.text}`);
    };

    this.recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        this.transcript += ' ' + e.result.text;
      }
    };

    this.recognizer.startContinuousRecognitionAsync();
  }
  reset() {
    this.transcript = '';
    this.answer = '';
    this.isRecording = false;
  }
  stopListening() {
    if (!this.isRecording) return;
    this.isRecording = false;

    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync(
        () => {
          console.log('Recognition stopped.');
          this.recognizer.close();
          this.recognizer = null!;
        },
        (err) => {
          console.error('Error stopping recognition:', err);
        }
      );
    }
  }

  showAnswer() {
    this.stopListening();
    // this.http.post(environment.apiUrl+'/api/speech/chatgpt', { transcript: this.transcript }).subscribe((res: any) => {
    //   this.chatGPTResponse = res.response;
    // });
    // this.http.post(environment.apiUrl+'/api/speech/chatgpt', this.transcript).subscribe((res: any) => {
    //   this.chatGPTResponse = res.response;
    // });
    this.spinner.show();
    const gptRequest: GPTRequest = {
      Transcript: this.transcript
    };

    this.http.post<GPTResponse>(environment.apiUrl + '/api/speech/chatgpt', gptRequest).subscribe((res: GPTResponse) => {
      this.answer = res.answer;

      this.spinner.hide();
    });
  }
}
