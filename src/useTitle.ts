import {
  ref,
  computed,
  watchEffect,
  onUnmounted,
  Ref,
  watch,
  unref
} from 'vue';

const DEFAULT_TITLE = 'Payment Page';

type Title = string | null | undefined;

type TitleValue = Ref<Title> | Title;

// Интерфейс для объекта заголовка в стеке
interface TitleObject {
  title: Title;
  priority: number;
}

// Реф для хранения стека заголовков
(window as any).titleStack = ref<TitleObject[]>([]);

// Реф для хранения текущего заголовка
(window as any).currentTitle = computed(() => {
  // Фильтруем стек заголовков, чтобы исключить undefined и null
  const validTitles = (window as any).titleStack.value.filter(
    (item: TitleObject) => item.title !== undefined && item.title !== null
  ) as TitleObject[];

  if (validTitles.length === 0) {
    return DEFAULT_TITLE; // Заголовок по умолчанию
  }

  // Возвращаем заголовок с наивысшим приоритетом, если он не один
  const highestPriorityTitle = validTitles.reduce((prev, current) =>
    prev.priority > current.priority ? prev : current
  );
  
  return highestPriorityTitle.title;
});

// Следим за изменением currentTitle и обновляем document.title
watchEffect(() => {
  console.log('document.title', (window as any).currentTitle.value);
  document.title = (window as any).currentTitle.value as string;
});

export function useTitle(title: TitleValue, priority = 0) {
  const titleRef = computed(() => unref(title)) as Ref<string | null | undefined>;

  const titleObject: TitleObject = {
    title: titleRef.value,
    priority,
  };

  const addTitle = () => {
    if (
      titleObject.title !== undefined &&
      titleObject.title !== null &&
      !(window as any).titleStack.value.includes(titleObject)
    ) {
      (window as any).titleStack.value.push(titleObject);
    }
  };

  const removeTitle = () => {
    const index = (window as any).titleStack.value.indexOf(titleObject);
    if (index !== -1) {
      (window as any).titleStack.value.splice(index, 1);
    }
  };

  const stopWatch = watch(
    titleRef,
    (newValue) => {
      titleObject.title = newValue;

      if (newValue !== undefined && newValue !== null) {
        if (!(window as any).titleStack.value.includes(titleObject)) {
          addTitle();
        }
      } else {
        removeTitle();
      }
    },
    { immediate: true }
  );

  addTitle();

  onUnmounted(() => {
    removeTitle();
    stopWatch();
  });
}