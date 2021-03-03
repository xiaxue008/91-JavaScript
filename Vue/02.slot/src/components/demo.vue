<template>
    <div class="container">
        <!-- <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main> -->
        <footer>
            <slot name="footer"></slot>
        </footer>

        <slot :user="user">
            {{ user.lastName }}
        </slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                firstName: 'zhang',
                lastName: 'san',
            },
        };
    },
};
</script>

<style scoped>
.fa {
    display: block;
    height: 40px;
}
</style>
