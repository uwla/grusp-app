<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav align="end">
          <b-nav-item href="#" >Home</b-nav-item>
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <Nuxt />
  </div>
</template>

<style type="text/css">
.navbar-nav {
    width: 100%;
}
</style>
