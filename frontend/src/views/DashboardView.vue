<template> 
  <div> 
    <Dashboard/> 
  </div> 
</template> 
<script> 
import Dashboard from "@/components/Dashboard"; 
export default { 
  name: "DashboardView", 
  components: { 
    Dashboard 
  },   

  created() { 
    this.$emit("message", true); 
  }, 
} 
</script> 

<style scoped> 
</style> 