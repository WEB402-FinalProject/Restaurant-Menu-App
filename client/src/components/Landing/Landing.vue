<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <div class="relative" style="background-color: white">
    <nav class="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex justify-between items-center py-6 md:justify-start md:space-x-10"
        >
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span class="sr-only">Your Company</span>
              <svg
                class="h-8 w-auto sm:h-10 text-indigo-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zM9.71 16.29l-3.58-3.59a1 1 0 010-1.41l.71-.71a1 1 0 011.41 0l2.17 2.17 4.24-4.24a1 1 0 011.41 0l.71.71a1 1 0 010 1.41l-4.95 4.95a1 1 0 01-1.41 0z"
                />
              </svg>
            </a>
          </div>
          <div class="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              id="mobile-menu-button"
              @click="toggleMenu"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav class="hidden md:flex space-x-10">
            <a
              href="/features"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
              >Features</a
            >
            <a
              href="/pricing"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
              >Pricing</a
            >
            <a
              href="/testimonials"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
              >Testimonials</a
            >
            <a
              href="/contact"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
              >Contact</a
            >
          </nav>
          <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              href="/login"
              class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >Sign in</a
            >
            <a
              href="/register"
              class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >Get started</a
            >
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        id="mobile-menu"
        :class="[
          'md:hidden px-4 pt-2 pb-3 space-y-1 transition-all duration-300',
          isMenuOpen ? 'block' : 'hidden',
        ]"
      >
        <a
          href="/features"
          class="block text-base font-medium text-gray-700 hover:text-gray-900"
          >Features</a
        >
        <a
          href="/pricing"
          class="block text-base font-medium text-gray-700 hover:text-gray-900"
          >Pricing</a
        >
        <a
          href="/testimonials"
          class="block text-base font-medium text-gray-700 hover:text-gray-900"
          >Testimonials</a
        >
        <a
          href="/contact"
          class="block text-base font-medium text-gray-700 hover:text-gray-900"
          >Contact</a
        >
        <a
          href="/login"
          class="block text-base font-medium text-gray-700 hover:text-gray-900"
          >Sign in</a
        >
        <a
          href="/register"
          class="block text-base font-medium text-indigo-600 hover:text-indigo-800"
          >Get started</a
        >
      </div>
    </nav>

    <!-- Your main hero content and the rest of the page here... -->
    <main
      class="flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style="min-height: 90vh; background-color: white"
    >
      <div class="text-center max-w-4xl">
        <h1
          class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
        >
          <span class="block xl:inline">The Ultimate Digital Menu</span>
          <span class="block text-indigo-600 xl:inline"
            >for Modern Restaurants</span
          >
        </h1>
        <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5 md:text-xl"
        >
          Engage your customers with interactive digital menus, streamline
          ordering with QR codes, and gain valuable insights to grow your
          business.
        </p>
        <div class="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-center">
          <div class="rounded-md shadow">
            <a
              href="#"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >Request a Demo</a
            >
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <a
              href="#features"
              class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >Explore Features</a
            >
          </div>
        </div>
      </div>
    </main>
  </div>

  <div class="py-12 bg-gray-50" id="features">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Key Features to Grow Your Restaurant
      </h2>
      <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="feature-icon bg-indigo-100 text-indigo-600">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13c1.168-.777 2.754-1.253 4.5-1.253S19.832 5.477 21 6.253v13c-1.168-.777-2.754-1.253-4.5-1.253s-3.332.477-4.5 1.253V6.253z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Interactive Digital Menus
          </h3>
          <p class="text-gray-600">
            Visually appealing menus that are easy for customers to browse on
            their devices.
          </p>
        </div>
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="feature-icon bg-blue-100 text-blue-600">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Seamless QR Code Ordering
          </h3>
          <p class="text-gray-600">
            Enable quick and contactless ordering by simply scanning a QR code.
          </p>
        </div>
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="feature-icon bg-green-100 text-green-600">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 15a4 4 0 004 4h9a4 4 0 004-4V3H3v12zM9 19c0 1.104-.896 2-2 2-1.104 0-2-.896-2-2 0-1.104.896-2 2-2 1.104 0 2 .896 2 2zm9-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v4h4z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Efficient Order Management
          </h3>
          <p class="text-gray-600">
            Track and manage orders in real-time through an intuitive dashboard.
          </p>
        </div>
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="feature-icon bg-yellow-100 text-yellow-600">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-2m3-4v-2M5 16.5c2.071-1.79 4.792-2.25 7.5-2.25s5.429.46 7.5 2.25m-13.458-3.25C6.157 8.249 10.347 7 15 7a9.012 9.012 0 018.621 12.348M5 19.75a4.004 4.004 0 01-.014-1.997m23.997.001A4.004 4.004 0 0123 16.5m-1.002-2.247a4.004 4.004 0 00-2.25-2.25M5 13.75a4.007 4.007 0 012.25-2.25M19 11.75a4.007 4.007 0 00-2.25-2.25m2.25 2.25c-1.108-1.083-2.928-1.723-4.785-1.723s-3.677.64-4.785 1.723"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Powerful Sales Analytics
          </h3>
          <p class="text-gray-600">
            Track popular items, peak hours, and customer behavior to optimize
            your strategy.
          </p>
        </div>
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="feature-icon bg-red-100 text-red-600">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l2 2h2a2 2 0 012 2v12a2 2 0 01-2 2zM15 17v-2m-3 2v-4m3 4V13"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Menu Customization & Branding
          </h3>
          <p class="text-gray-600">
            Tailor your digital menu with your logo, colors, and special offers.
          </p>
        </div>
        <div
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
        >
          <div class="feature-icon bg-purple-100 text-purple-600">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12m0 0l4 4m-4-4L16 8"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Scalable & Reliable Platform
          </h3>
          <p class="text-gray-600">
            Built to handle your growing business with a stable and dependable
            infrastructure.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white py-12">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="bg-indigo-50 rounded-lg shadow-lg overflow-hidden">
        <div
          class="pt-10 pb-12 px-6 sm:px-10 lg:py-16 lg:px-16 xl:flex xl:items-center"
        >
          <div class="xl:w-0 xl:flex-1">
            <h2
              class="text-2xl font-extrabold tracking-tight text-indigo-900 sm:text-3xl"
            >
              Ready to get started?
            </h2>
            <p class="mt-3 text-lg text-indigo-300">
              Join hundreds of restaurants already using our platform to enhance
              their dining experience.
            </p>
          </div>
          <div class="mt-8 xl:mt-0 xl:ml-8">
            <div class="rounded-md shadow">
              <a
                href="#register"
                class="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Up for Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="py-16 bg-gray-50" id="register">
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-lg"
    >
      <div class="p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up for Early Access
        </h2>
        <form class="space-y-6">
          <div>
            <label
              for="restaurantName"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Restaurant Name</label
            >
            <input
              type="text"
              id="restaurantName"
              class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your restaurant name"
            />
          </div>
          <div>
            <label
              for="email"
              class="block text-gray-600 text-sm font-bold mb-2"
              >Email Address</label
            >
            <input
              type="email"
              id="email"
              class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your email address"
            />
          </div>
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline w-full"
          >
            Get Started Now
          </button>
        </form>
        <p class="mt-6 text-gray-500 text-sm text-center">
          We're excited to help you transform your dining experience!
        </p>
      </div>
    </div>
  </div>

  <footer class="bg-gray-800 py-8 text-center text-gray-400 text-sm">
    <p>Crafted with ❤️ by Nirjala Prajapati & Shisham Chudal.</p>
    <p>
      Questions? Reach out:
      <a
        href="https://github.com/WEB402-FinalProject/Restaurant-Menu-App/issues"
        class="text-indigo-400 hover:underline"
        >GitHub Issues</a
      >
    </p>
    <p>© 2025 Westcliff University - All Rights Reserved.</p>
  </footer>
</template>

<style lang="scss" scoped>
.feature-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  margin-bottom: 1rem;
}
</style>
