import TestA from "./components/TestA";
import TestB from "./components/TestB";

import { createApp } from "./Vue";

const App = createApp({
    components: [TestA, TestB],
});

App.mount("#app");