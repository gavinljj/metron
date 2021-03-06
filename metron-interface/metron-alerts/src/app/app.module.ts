/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import {MetronAlertsRoutingModule} from './app-routing.module';
import {AlertsListModule} from './alerts/alerts-list/alerts-list.module';
import {AlertDetailsModule} from './alerts/alert-details/alerts-details.module';
import {ConfigureTableModule} from './alerts/configure-table/configure-table.module';
import {ConfigureTableService} from './service/configure-table.service';
import {SaveSearchModule} from './alerts/save-search/save-search.module';
import {SaveSearchService} from './service/save-search.service';
import {SavedSearchesModule} from './alerts/saved-searches/saved-searches.module';
import {ConfigureRowsModule} from './alerts/configure-rows/configure-rows.module';
import {SwitchModule} from './shared/switch/switch.module';
import {ColumnNamesService} from './service/column-names.service';
import {DataSource} from './service/data-source';
import {ElasticSearchLocalstorageImpl} from './service/elasticsearch-localstorage-impl';
import {LoginModule} from './login/login.module';
import {AuthGuard} from './shared/auth-guard';
import {AuthenticationService} from './service/authentication.service';
import {LoginGuard} from './shared/login-guard';
import {UpdateService} from './service/update.service';
import {MetaAlertService} from './service/meta-alert.service';
import {MetaAlertsModule} from './alerts/meta-alerts/meta-alerts.module';
import {SearchService} from './service/search.service';
import { GlobalConfigService } from './service/global-config.service';
import { DefaultHeadersInterceptor } from './http-interceptors/default-headers.interceptor';
import { DialogService } from './service/dialog.service';
import { MetronDialogComponent } from './shared/metron-dialog/metron-dialog.component';



import {PcapModule} from './pcap/pcap.module';

export function initConfig(config: ColumnNamesService) {
  return () => config.list();
}

@NgModule({
  declarations: [
    AppComponent,
    MetronDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetronAlertsRoutingModule,
    LoginModule,
    AlertsListModule,
    AlertDetailsModule,
    MetaAlertsModule,
    ConfigureTableModule,
    ConfigureRowsModule,
    SaveSearchModule,
    SavedSearchesModule,
    SwitchModule,
    PcapModule
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: initConfig, deps: [ColumnNamesService], multi: true },
              { provide: DataSource, useClass: ElasticSearchLocalstorageImpl },
              { provide: HTTP_INTERCEPTORS, useClass: DefaultHeadersInterceptor, multi: true },
              AuthenticationService,
              AuthGuard,
              LoginGuard,
              ConfigureTableService,
              SearchService,
              SaveSearchService,
              ColumnNamesService,
              UpdateService,
              MetaAlertService,
              GlobalConfigService,
              DialogService,
            ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(router: Router) {
  }
}
