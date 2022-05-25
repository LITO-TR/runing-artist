import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Row from "primevue/row";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Steps from "primevue/steps";
import ToastService from "primevue/toastservice";
import InputNumber from "primevue/inputnumber";
import Rating from "primevue/rating";
import Toast from "primevue/toast";
import InputMask from "primevue/inputmask";

//PrimeVue Styles
import "/node_modules/primeflex/primeflex.css";

import "primevue/resources/themes/mdc-dark-indigo/theme.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);

//PrimeVue Configuration
app.use(PrimeVue, { ripple: true });

app.use(ToastService);

//PrimeVue Components
app.component("pv-drop-down", Dropdown);
app.component("pv-toolbar",Toolbar)
app.component("pv-data-table", DataTable);
app.component("pv-column", Column);
app.component("pv-row", Row);
app.component("pv-button", Button);
app.component("pv-dialog", Dialog);
app.component("pv-toast",Toast)
app.component("pv-input-text", InputText);
app.component("pv-card", Card);
app.component("pv-tool-bar", Toolbar);
app.component("pv-toast", Toast);
app.component("pv-rating", Rating);
app.component("pv-step", Steps);
app.component("pv-input-number", InputNumber);
app.component("pv-input-mask", InputMask);
app.component("pv-dropdown", Dropdown);


app.mount("#app");
