<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Category</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="category.name" type="text" placeholder="Edit category name" required />
        <div class="modal-actions">
          <button type="submit" class="btn btn-primary">Save</button>
          <button @click="closeModal" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'update'],
  
  setup(props, { emit }) {
    const category = ref({ ...props.category })

    // Watch for changes in the category prop and update local state
    watch(() => props.category, (newCategory) => {
      category.value = { ...newCategory }
    })

    const closeModal = () => {
      emit('close')
    }

    const handleSubmit = () => {
      emit('update', category.value) // Emit the updated category
      closeModal() // Close the modal after submitting
    }

    return {
      category,
      closeModal,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
  border: none;
}

</style>
