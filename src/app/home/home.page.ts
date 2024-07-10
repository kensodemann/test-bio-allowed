import { Component, OnInit } from '@angular/core';
import { BiometricPermissionState, Device } from '@ionic-enterprise/identity-vault';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  permissions: BiometricPermissionState = BiometricPermissionState.Prompt;

  constructor() {}

  async ngOnInit() {
    if ((await Device.isBiometricsAllowed()) === BiometricPermissionState.Prompt) {
      try {
        await Device.showBiometricPrompt({ iosBiometricsLocalizedReason: 'Unlock with Face ID' });
      } catch (e: unknown) {
        null;
      }
    }

    this.permissions = await Device.isBiometricsAllowed();
  }
}
