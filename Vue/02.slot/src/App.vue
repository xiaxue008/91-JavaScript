<template>
    <div id="app">
        <demo>
            <!-- <template v-slot:header>
                <h1>Here might be a page title</h1>
            </template>

            <template>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </template> -->

            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>

            <template v-slot="slotProps">
                {{ slotProps.user.firstName }}
            </template>
        </demo>
    </div>
</template>

<script>
import Demo from './components/demo';
export default {
    name: 'App',

    components: {
        Demo: Demo,
    },
};
</script>

<style></style>
