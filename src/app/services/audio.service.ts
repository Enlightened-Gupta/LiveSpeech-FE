import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private apiUrl =environment.apiUrl+ '/api/speech/recognize';
  private mediaRecorder!: MediaRecorder;
  private audioChunks: BlobPart[] = [];

  constructor(private http: HttpClient) {}
  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.start();
      })
      .catch(err => console.error('Microphone access denied:', err));
  }

  stopRecording() {
    return new Promise<void>((resolve, reject) => {
      if (this.mediaRecorder) {
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.sendAudioToApi(audioBlob);
          this.audioChunks = []; // Clear buffer
          resolve();
        };
        this.mediaRecorder.stop();
      } else {
        reject('No active recorder');
      }
    });
  }
  private sendAudioToApi(audioBlob: Blob) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'speech.webm');

    this.http.post<{ text: string }>(this.apiUrl, formData).subscribe(response => {
      console.log('Recognized Text:', response.text);
    }, error => {
      console.error('Speech API error:', error);
    });
  }
}
