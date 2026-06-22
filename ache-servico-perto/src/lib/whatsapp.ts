const phoneNumber = "5500000000000";

export function buildWhatsAppUrl(message: string) {
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
