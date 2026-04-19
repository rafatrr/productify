import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    myProducts: "My Products",
    manageListings: "Manage your listings",
    newProduct: "New",
    whatsappNumber: "WhatsApp Number",
    save: "Save",
    phoneSaved: "Phone number saved! ✓",
    totalProducts: "Total Products",
    noProducts: "No products yet",
    startCreating: "Start by creating your first product",
    createProduct: "Create Product",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    profile: "Profile",
    signIn: "Sign In",
    signUp: "Sign Up",
    theme: "Theme",
    createProduct: "Create Product",
    back: "Back",
    title: "Title",
    chooseImage: "Choose an image",
    description: "Description",
    createProduct: "Create Product",
    editProduct: "Edit Product",
    saveChanges: "Save Changes",
    image: "Image",
    ContactOnWhatsApp: "Contact on WhatsApp",
    Delete: "Delete",
    Comments: "Comments",
    Addacomment: "Add a comment..",
  },
  ar: {
    myProducts: "منتجاتي",
    manageListings: "إدارة قوائمك",
    newProduct: "منتج جديد",
    whatsappNumber: "رقم الواتساب",
    save: "حفظ",
    phoneSaved: "تم حفظ الرقم! ✓",
    totalProducts: "إجمالي المنتجات",
    noProducts: "لا توجد منتجات بعد",
    startCreating: "ابدأ بإنشاء منتجك الأول",
    createProduct: "إنشاء منتج",
    view: "عرض",
    edit: "تعديل",
    delete: "حذف",
    profile: "الملف الشخصي",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    theme: "المظهر",
    createProduct: "إنشاء منتج",
    back: "رجوع",
    chooseImage: "اختر صورة",
    description: "الوصف",
    title: "العنوان",
    createProduct: "إنشاء منتج",
    editProduct: "تعديل منتج",
    saveChanges: "حفظ التغييرات",
    image: "صورة",
    ContactOnWhatsApp: "تواصل عبر واتساب",
    Delete: "حذف",
    Comments: "التعليقات",
    Addacomment: "أضف تعليق     ",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);