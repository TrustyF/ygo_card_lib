import cv2


class Webcam:
    def __init__(self):
        self.video = None

    def __del__(self):
        if self.video is not None:
            self.video.release()

    def start_webcam(self):
        self.video = cv2.VideoCapture(0)
        if not self.video.isOpened():
            print('warning: could not open webcam')

    def is_ready(self):
        return self.video is not None and self.video.isOpened()

    def get_frame_bytes(self):
        if not self.is_ready():
            return None
        ret, frame = self.video.read()
        if not ret or frame is None:
            return None
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes()

    def get_stream(self):
        while True:
            frame = self.get_frame_bytes()
            if frame is None:
                continue
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

    def get_frame_cv2(self):
        if not self.is_ready():
            return None
        ret, frame = self.video.read()
        if not ret or frame is None:
            return None
        return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)