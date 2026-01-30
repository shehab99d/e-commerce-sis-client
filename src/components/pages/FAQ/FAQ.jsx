import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
    const faqs = [
        {
            question: "What type of clothes do you sell?",
            answer: "Our boutique specializes in premium-tier apparel and traditional dresses, meticulously sourced directly from the artisans of Cumilla, Bangladesh.",
        },
        {
            question: "How long does delivery take?",
            answer: "Standard delivery within Cumilla is 1-2 business days. National shipping across Bangladesh typically arrives within 3-5 business days.",
        },
        {
            question: "What is the return and refund policy?",
            answer: "We offer a 7-day inspection window. If you are unsatisfied, returns are accepted provided items are unworn, unwashed, and in original packaging.",
        },
        {
            question: "Which payment methods are available?",
            answer: "For your convenience, we accept Cash on Delivery (COD), bKash, Nagad, and all major Credit/Debit cards via our secure gateway.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="bg-[#0a0a0a] text-white py-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header with entrance animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Assistance</h2>
                    <h1 className="text-4xl md:text-5xl font-light italic serif">
                        Questions <span className="font-bold not-italic">&</span> Answers
                    </h1>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`border-b border-white/10 transition-colors duration-500 ${isOpen ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                            >
                                <button
                                    className="w-full flex justify-between items-center py-7 px-6 text-left"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    <span className={`text-lg md:text-xl transition-all duration-300 ${isOpen ? 'text-white' : 'text-gray-400'}`}>
                                        {faq.question}
                                    </span>
                                    <div className="relative flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                                            className="absolute"
                                        >
                                            <Plus size={20} strokeWidth={1.5} />
                                        </motion.div>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 0 : -90, opacity: isOpen ? 1 : 0 }}
                                        >
                                            <Minus size={20} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 pb-8 text-gray-400 leading-relaxed max-w-2xl">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;