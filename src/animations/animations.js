import { motion } from "framer-motion";

export const animateStaggered = {
    initial: { opacity: 0, y: 15 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.15, ease: "easeInOut", duration: 0.4 },
    },
}

export const animateFadeIn = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, },
    transition: { ease: "easeInOut", duration: 0.4 }
}

export const AnimateFadeIn = ({ children, delay, callback }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                ease: "easeInOut",
                duration: 0.4,
                ...(delay && {delay: delay})
            }}
            onAnimationComplete={callback}
        >
            {children}
        </motion.div>
    )
}

export const AnimateFadeInAndUp = ({ children, delay, callback }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, }}
            transition={{
                ease: "easeInOut",
                duration: 0.4,
                ...(delay && {delay: delay})
            }}
            onAnimationComplete={callback}
        >
            {children}
        </motion.div>
    )
}

export const AnimateFadeInWhileInView = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, }}
            transition={{
                ease: "easeInOut",
                duration: 0.3,
            }}
            viewport={{
                // once: true,
                margin: "0px 0px 40px 0px"
            }}
        >
            {children}
        </motion.div>
    )
}