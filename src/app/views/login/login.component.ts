import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, WebhooksService } from '../../_services';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [MessageService]
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string='/dashboard';
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private webhook: WebhooksService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/dashboard']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userId: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.error = '';

        this.loading = true;
        this.authenticationService.login(this.f.userId.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data['status'] == 1){
                        localStorage.removeItem('errorCount');
                        var returnval = this.returnUrl.split('?ModuleID=')
                        console.log(returnval);
                        //this.router.navigate([this.returnUrl]);
                        this.router.navigate([returnval[0]], { queryParams: { ModuleID: returnval[1] } });
                    }
                    else{
                        this.error = data['data'];
                        this.messageService.add({severity:'error', summary: 'Login Failed', detail:this.error});
                        this.loading = false;
                        var errorcount:any = localStorage.getItem('errorCount');
                        errorcount = (errorcount*1) + 1;
                        localStorage.setItem('errorCount', errorcount); 
                    }
                    
                },
                error => {
                    this.error = error;
                    this.messageService.add({severity:'error', summary: 'Login Failed', detail:this.error});
                    this.loading = false;
                    var errorcount:any = localStorage.getItem('errorCount');
                        errorcount = (errorcount*1) + 1;
                        localStorage.setItem('errorCount', errorcount);
                });
    }
}
