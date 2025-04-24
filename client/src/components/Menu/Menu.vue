<template>
  <div class="flex flex-col items-center mt-10 gap-8">
    <h1 class="text-3xl font-bold">Our Menu</h1>
    <div class="flex w-full max-w-sm items-center gap-1.5">
      <Input id="text" class="p-5" type="text" placeholder="Search Menu Items..." />
      <Button class="p-5" type="submit">Search</Button>
    </div>   
  </div>

  <!-- Looping Cards -->
  <div class="flex flex-wrap justify-center gap-4 mt-8">
    <div v-for="(item, index) in categories" :key="index">
      <Card class="w-[280px] h-auto rounded-t-md p-0">
        <!-- <CardContent class="p-0 ">
          <img :src="item.image" alt="Menu image" class="w-full h-48 object-cover rounded-t-md" />
        </CardContent> -->
        <CardHeader>
          <CardTitle class="font-bold text-2xl">{{ item.name }}</CardTitle>
          <!-- <CardDescription class="text-[15px]">{{ item.description }}</CardDescription> -->
        </CardHeader>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button class="w-full" @click="goToCategory(item._id)">
  {{ `Browse ${item.name} `}}
</Button>        </CardFooter>
      </Card>
    </div>
  </div>
</template>


<script setup>
import { ref , onMounted } from 'vue'
import { useRouter } from "vue-router";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import categoryService from '@/services/categoryService/categoryService'

const categories= ref({})
const router = useRouter();
onMounted(async () => {
  try {
    const response = await categoryService.getCategories();
    if (Array.isArray(response.data)) {
      categories.value = response.data;
    } else {
      console.error("Expected array but got:", response.data);
    }
  } catch (error) {
    console.error("Fetch categories error:", error);
    alert("Something went wrong. Try again.");
  }
});
const goToCategory = (category) => {
  router.push(`/menu/${category}`);
};
</script>
