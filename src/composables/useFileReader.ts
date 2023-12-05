export function useFileReader() {
  const fileContent = ref<string | null>(null);

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = (target.files || [])[0];

    if (!file) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: Event) => {
      const result = (e.target as FileReader).result;
      if (result) {
        fileContent.value = result.toString();
      }
    };

    reader.readAsText(file);
  };

  return { fileContent, handleFileChange };
}
