import { Observable } from '@nativescript/core';
import { auth } from './services/firebase';
import { supabase } from './services/supabase';

export class MainViewModel extends Observable {
  private _balance: string = '₱0';

  constructor() {
    super();
    this.loadBalance();
    auth.onAuthStateChanged(() => this.loadBalance());
  }

  get balance(): string {
    return this._balance;
  }

  set balance(value: string) {
    if (this._balance !== value) {
      this._balance = value;
      this.notifyPropertyChange('balance', value);
    }
  }

  async loadBalance() {
    try {
      const user = auth.currentUser;
      if (!user) {
        this.balance = '₱0';
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('walletbalance')
        .eq('uid', user.uid)
        .single();

      if (error) throw error;
      this.balance = `₱${data.walletbalance}`;
    } catch (err) {
      console.error('Failed to load balance:', err);
      this.balance = '₱0';
    }
  }

  onCashIn() {
    // Implement cash in logic
  }

  onTransfer() {
    // Implement transfer logic
  }
}